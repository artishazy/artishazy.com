"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

const glyphs = ".:+-=*#@";
// Outline in the resting camera plane, with room for the short hero rotation.
const heroHitOutline = [
  [.32,.57], [.46,.56], [.43,.31], [.33,.12], [.32,-.10],
  [.41,-.43], [.26,-.53], [-.27,-.57], [-.44,-.46],
  [-.36,-.28], [-.22,-.11], [-.10,.05], [-.055,.24], [.15,.25],
];

type KnightProps = { embedded?: boolean; ru?: boolean; initialLight?: boolean; onOpen?: () => void; onClose?: () => void };

export default function KnightParticles({ embedded = false, ru = true, initialLight = false, onOpen, onClose }: KnightProps) {
  const stage = useRef<HTMLDivElement>(null);
  const openViewer = useRef<HTMLButtonElement>(null);
  const palette = useRef(initialLight);
  const [light, setLight] = useState(initialLight);
  const [status, setStatus] = useState("Загружаю модель…");

  useEffect(() => {
    const host = stage.current!;
    const restingYaw = Math.PI + THREE.MathUtils.degToRad(67);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true });
    } catch {
      const notification = requestAnimationFrame(() => setStatus("Для просмотра нужен WebGL."));
      return () => cancelAnimationFrame(notification);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.append(renderer.domElement);
    const scene = new THREE.Scene();
    const figure = new THREE.Group();
    scene.add(figure);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 20);
    const atlas = document.createElement("canvas");
    atlas.width = 256;
    atlas.height = 32;
    const ctx = atlas.getContext("2d")!;
    ctx.font = "bold 26px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    [...glyphs].forEach((glyph, i) => ctx.fillText(glyph, i * 32 + 16, 16));
    const texture = new THREE.CanvasTexture(atlas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    const cursor = new THREE.Vector2(2, 2);
    const echoes = Array.from({ length: 6 }, () => new THREE.Vector3(2, 2, 10));
    const lastEcho = new THREE.Vector2(2, 2);
    let echoIndex = 0;
    let lastEchoTime = -Infinity;
    const uniforms = {
      atlas: { value: texture },
      clock: { value: 0 },
      assembly: { value: 0 },
      cursor: { value: cursor },
      echoes: { value: echoes },
      lightTheme: { value: 0 },
      backdrop: { value: embedded ? 1 : 0 },
      ink: { value: new THREE.Color("#f0ede6") },
      size: { value: 5 },
      aspect: { value: 1 },
      viewportHeight: { value: 1 },
      startLight: { value: new THREE.Vector3(-.52, .76, .83).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), -restingYaw) },
      wake: { value: new THREE.Vector3(-.34, 0, -.055).applyAxisAngle(new THREE.Vector3(0, 1, 0), -restingYaw) },
      foldLift: { value: new THREE.Vector3(0, 0, .22).applyAxisAngle(new THREE.Vector3(0, 1, 0), -restingYaw) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        uniform float clock, assembly, size, aspect, viewportHeight;
        uniform vec2 cursor;
        uniform vec3 echoes[6];
        uniform float lightTheme, backdrop;
        uniform vec3 startLight, wake, foldLift;
        attribute float seed;
        attribute float trail;
        attribute vec3 releasePath;
        attribute vec3 surfaceNormal;
        varying float glyph, opacity, freeParticle;
        void main() {
          vec3 n = normalize(normalMatrix * surfaceNormal);
          freeParticle = step(2.5, trail);
          float lit = max(0., dot(surfaceNormal, startLight));
          float viewLight = max(0., dot(n, normalize(vec3(-.35,.6,1.))));
          lit = mix(max(lit, viewLight * .75), lit, backdrop);
          float rim = pow(1. - abs(n.z), 4.) * .25;
          // The raised blade needs a continuous highlight even on its narrow edge.
          float blade = smoothstep(.17, .28, position.y);
          float armor = smoothstep(-.16, .15, position.y) * (1. - blade);
          float detail = clamp(pow(lit, 2.) + rim + blade * .52 + armor * .14, 0., 1.);
          float density = clamp(.065 + .935 * pow(lit, 1.9) + blade * .85 + lightTheme * (.16 + armor * .12), 0., 1.);
          opacity = (mix(.22, .46, lightTheme) + detail * mix(.78, .54, lightTheme)) * step(seed, density);
          float variant = fract(seed * 91.73);
          glyph = floor(variant * 4. + detail * 2.);
          if (variant > .96) glyph = 6. + step(.98, variant);
          float pointScale = .85 + backdrop * (variant * .34 + detail * .18 - .21);
          vec3 p = position + surfaceNormal * .0015;
          if (trail > 2.5) {
            float phase = releasePath.x;
            p += vec3(
              sin(clock * .23 + phase) * .024,
              cos(clock * .17 + phase) * .033,
              sin(clock * .14 + phase * 1.6) * .025
            );
            glyph = 2. + floor(variant * 4.);
            opacity = mix(.86, .98, lightTheme) * (.77 + variant * .23);
            pointScale = 1.30 + variant * .33;
          } else if (trail > .5) {
            float phase = fract(releasePath.x + seed * .075 + clock * .087);
            float release = smoothstep(.27, .86, phase);
            float travel = release * (.85 + .15 * release);
            float reach = releasePath.z * mix(1., .53, backdrop);
            p += wake * travel * (.45 + variant * .85) * reach;
            if (trail > 1.5) p += foldLift * travel;
            p.y -= travel * releasePath.y * (.55 + variant * .65) * mix(1., .8, backdrop);
            opacity = smoothstep(.02, .14, phase) * (1. - smoothstep(.56, .83, phase))
              * mix(.46, .86, detail) * assembly;
          }
          // Let the lit edges appear first, followed by the quieter glyphs.
          float revealAt = (1. - detail) * .37 + seed * .21 + (.5 - position.y) * .14;
          opacity *= smoothstep(revealAt, revealAt + .22, assembly);
          vec4 clip = projectionMatrix * modelViewMatrix * vec4(p, 1.);
          vec2 d = clip.xy / clip.w - cursor;
          vec2 offset = d * vec2(aspect, 1.) * viewportHeight * .5;
          float influence = 1. - smoothstep(5., 42., length(offset));
          vec2 push = offset / max(8., length(offset)) * influence * (5. + variant * 12.) * step(.23, variant);
          vec2 drift = vec2(0.);
          float strongest = 0.;
          for (int i = 0; i < 6; i++) {
            vec2 fromEcho = (clip.xy / clip.w - echoes[i].xy) * vec2(aspect, 1.) * viewportHeight * .5;
            float age = echoes[i].z;
            float impulse = (1. - smoothstep(10., 51., length(fromEcho)))
              * smoothstep(0., .17, age) * (1. - smoothstep(.19, .60 + variant * .53, age));
            if (impulse > strongest) {
              strongest = impulse;
              vec2 direction = fromEcho + vec2(cos(seed * 87.), sin(seed * 87.)) * 12.;
              drift = direction / max(6., length(direction)) * impulse * (28. + variant * 74.);
            }
          }
          push += drift * step(.68, variant);
          push *= mix(1., .58, backdrop) * (trail > 2.5 ? .25 : 1.);
          clip.xy += push * 2. * clip.w / (viewportHeight * vec2(aspect, 1.));
          clip.x += sin(clock * 1.4 + seed * 90.) * .0006 * clip.w;
          gl_Position = clip;
          gl_PointSize = size * pointScale;
        }`,
      fragmentShader: `
        uniform sampler2D atlas;
        uniform vec3 ink;
        varying float glyph, opacity, freeParticle;
        void main() {
          float mask = texture2D(atlas, vec2((glyph + gl_PointCoord.x) / 8., 1. - gl_PointCoord.y)).a;
          if (mask * opacity < .045) discard;
          vec3 particleInk = mix(ink, ink * .56, freeParticle * step(ink.r, .5));
          gl_FragColor = vec4(particleInk, mix(mask, sqrt(mask), freeParticle) * opacity);
          #include <colorspace_fragment>
        }`,
    });
    let disposed = false;
    let started = 0;
    let frame = 0;
    let yaw = 0;
    let target = 0;
    let pitch = 0;
    let targetPitch = 0;
    let zoom = 1;
    let targetZoom = 1;
    let fitDistance = 2;
    let drag: { id: number; x: number; y: number; yaw: number; moved: boolean } | undefined;
    const fingers = new Map<number, THREE.Vector2>();
    let pinchDistance = 0;
    let surface: THREE.BufferGeometry | undefined;
    let cloud: THREE.BufferGeometry | undefined;
    const depthMaterial = new THREE.MeshBasicMaterial({ colorWrite: false, side: THREE.DoubleSide });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    new GLTFLoader().load("/models/knight-blender.glb", ({ scene: model }) => {
      try {
        if (disposed) return;
        model.updateMatrixWorld(true);
        let source: THREE.Mesh | undefined;
        model.traverse((object) => {
          if (object instanceof THREE.Mesh && (!source || object.geometry.attributes.position.count > source.geometry.attributes.position.count)) source = object;
        });
        if (!source) throw new Error("Missing mesh");
        surface = source.geometry.clone();
        surface.applyMatrix4(source.matrixWorld);
        surface.computeBoundingBox();
        const bounds = surface.boundingBox!;
        const center = bounds.getCenter(new THREE.Vector3());
        const height = bounds.max.y - bounds.min.y;
        surface.translate(-center.x, -center.y, -center.z);
        surface.scale(1 / height, 1 / height, 1 / height);
        const mask = new THREE.Mesh(surface, depthMaterial);
        figure.add(mask);
        const sampler = new MeshSurfaceSampler(mask).build();
        const count = host.clientWidth < 650 ? 42000 : 76000;
        const compact = host.clientWidth < 650;
        const ambientGroups = [
          { x: -.15, y: .30, size: 4 },
          { x: -.28, y: .015, size: 3 },
          { x: -.41, y: -.29, size: 5 },
          { x: .31, y: -.30, size: 4 },
          ...(!compact ? [
            { x: .36, y: .14, size: 3 },
            { x: -.14, y: -.49, size: 3 },
          ] : []),
        ];
        const ambientSingles = [
          [-.29, .39], [-.035, .37], [.17, .39], [.34, .30],
          [-.36, .20], [-.21, .16], [.43, .035], [.28, -.07],
          [-.39, -.10], [.38, -.19], [-.46, -.40], [.22, -.47],
          ...(!compact ? [[-.06, .22], [.45, .23], [-.48, -.19], [.47, -.33], [.025, -.51]] : []),
        ];
        const total = count + ambientSingles.length + ambientGroups.reduce((sum, group) => sum + group.size, 0);
        const positions = new Float32Array(total * 3);
        const normals = new Float32Array(positions.length);
        const seeds = new Float32Array(total);
        const trails = new Float32Array(seeds.length);
        const releasePaths = new Float32Array(total * 3);
        type EdgeSample = { index: number; edge: number };
        // End the back emitters at shoulder height, below the helmet.
        const contour = Array.from({ length: 56 }, () => [] as EdgeSample[]);
        const hem = Array.from({ length: 30 }, () => [] as EdgeSample[]);
        const blade = Array.from({ length: 7 }, () => [] as EdgeSample[]);
        const cos = Math.cos(restingYaw);
        const sin = Math.sin(restingYaw);
        const point = new THREE.Vector3();
        const normal = new THREE.Vector3();
        for (let i = 0; i < count; i++) {
          sampler.sample(point, normal);
          point.toArray(positions, i * 3);
          normal.toArray(normals, i * 3);
          seeds[i] = Math.random();
          // Find the trailing silhouette in the initial camera view.
          const depth = camera.position.z + point.x * sin - point.z * cos;
          const screenX = (point.x * cos + point.z * sin) / depth * camera.position.z;
          const screenY = point.y / depth * camera.position.z;
          const band = contour[Math.floor((screenY + .46) / .01)];
          if (band && screenX < .07) band.push({ index: i, edge: screenX });
          const hemBand = hem[Math.floor((screenX + .44) / .016)];
          if (hemBand && screenY < -.29) hemBand.push({ index: i, edge: screenY });
          const bladeBand = blade[Math.floor((point.y - .35) / .02)];
          if (bladeBand) bladeBand.push({ index: i, edge: screenX });
        }
        const markRelease = (index: number, phase: number, drop: number, reach: number) => {
          trails[index] = 1;
          releasePaths.set([phase, drop, reach], index * 3);
        };
        for (const band of contour) band.sort((a, b) => a.edge - b.edge);
        const releasePhases = Array.from({ length: Math.ceil(contour.length / 3) }, () => Math.random());
        for (let row = 0; row < contour.length; row++) {
          const band = contour[row];
          if (!band.length) continue;
          const edge = band[0].edge;
          const above = contour[row + 4]?.[0]?.edge;
          const below = contour[row - 4]?.[0]?.edge;
          const width = above !== undefined && below !== undefined ? Math.max(0, above - below) : .06;
          const drop = THREE.MathUtils.clamp(.018 / Math.max(.08, width + .04), .035, .19);
          const upper = THREE.MathUtils.smoothstep(row, 46, 55);
          for (const sample of band) {
            if (sample.edge - edge > THREE.MathUtils.lerp(.016, .006, upper)) break;
            markRelease(sample.index, releasePhases[Math.floor(row / 3)], drop, 1 - upper * .53);
          }
        }
        for (const band of hem) {
          band.sort((a, b) => a.edge - b.edge);
          if (!band.length) continue;
          const phase = Math.random();
          for (const sample of band.slice(0, 12)) {
            if (sample.edge - band[0].edge > .012) break;
            if (!trails[sample.index]) markRelease(sample.index, phase, .095, .49);
          }
        }
        for (const band of blade) {
          band.sort((a, b) => a.edge - b.edge);
          const phase = Math.random();
          for (const sample of band.slice(0, 5)) markRelease(sample.index, phase, .033, .30);
        }
        // Pick lit, front-facing surfaces just inside the trailing contour.
        const folds = [
          { rows: [10, 11, 12], inset: .14 },
          { rows: [19, 20, 21], inset: .095 },
          { rows: [27, 28, 29], inset: .07 },
        ];
        for (const fold of folds) {
          const phase = Math.random();
          for (const row of fold.rows) {
            const band = contour[row];
            if (!band.length) continue;
            const center = band[0].edge + fold.inset;
            const ridge = band.filter(({ index, edge }) => {
              if (trails[index] || Math.abs(edge - center) > .024) return false;
              normal.fromArray(normals, index * 3);
              return normal.z * cos - normal.x * sin > .36 && normal.dot(uniforms.startLight.value) > .50;
            });
            for (const { index } of ridge.slice(0, 22)) {
              markRelease(index, phase, .12, .94);
              trails[index] = 2;
            }
          }
        }
        const ambientPosition = new THREE.Vector3();
        const up = new THREE.Vector3(0, 1, 0);
        const writeAmbient = (index: number, phase: number) => {
          point.copy(ambientPosition).applyAxisAngle(up, -restingYaw).toArray(positions, index * 3);
          normals[index * 3 + 1] = 1;
          seeds[index] = Math.random();
          trails[index] = 3;
          releasePaths[index * 3] = phase;
        };
        let ambientIndex = count;
        for (const [x, y] of ambientSingles) {
          ambientPosition.set(
            x + (Math.random() - .5) * .024,
            y + (Math.random() - .5) * .024,
            (Math.random() - .5) * .24,
          );
          writeAmbient(ambientIndex++, Math.random() * 43);
        }
        for (const { x, y, size } of ambientGroups) {
          const phase = Math.random() * 43;
          const depth = (Math.random() - .5) * .22;
          for (let member = 0; member < size; member++) {
            const angle = member * 2.4 + phase;
            const radius = member === 0 ? 0 : .009 + Math.random() * .009;
            ambientPosition.set(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius * .83, depth);
            writeAmbient(ambientIndex++, phase);
          }
        }
        cloud = new THREE.BufferGeometry();
        cloud.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        cloud.setAttribute("surfaceNormal", new THREE.BufferAttribute(normals, 3));
        cloud.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
        cloud.setAttribute("trail", new THREE.BufferAttribute(trails, 1));
        cloud.setAttribute("releasePath", new THREE.BufferAttribute(releasePaths, 3));
        const points = new THREE.Points(cloud, material);
        points.frustumCulled = false;
        figure.add(points);
        started = performance.now();
        setStatus("");
      } catch {
        if (!disposed) setStatus("Не удалось прочитать геометрию модели.");
      } finally {
        const textures = new Set<THREE.Texture>();
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();
          for (const mat of [object.material].flat() as THREE.Material[]) {
            for (const value of Object.values(mat)) if (value instanceof THREE.Texture) textures.add(value);
            mat.dispose();
          }
          if (object instanceof THREE.SkinnedMesh) object.skeleton.dispose();
        });
        textures.forEach((map) => map.dispose());
      }
    }, undefined, () => { if (!disposed) setStatus("Не удалось загрузить модель."); });

    function resize() {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      const wideHero = embedded && window.matchMedia("(min-width: 901px)").matches;
      fitDistance = Math.max(wideHero ? 2.24 : 1.98, 1.75 / camera.aspect);
      camera.position.z = fitDistance / zoom;
      figure.position.set(wideHero ? .085 : 0, wideHero ? .04 : 0, 0);
      camera.updateProjectionMatrix();
      if (embedded && openViewer.current) {
        const scale = height / (2 * fitDistance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
        const polygon = heroHitOutline.map(([x, y]) =>
          `${width / 2 + (x + figure.position.x) * scale}px ${height / 2 - (y + figure.position.y) * scale}px`,
        );
        openViewer.current.style.clipPath = `polygon(${polygon.join(",")})`;
      }
      uniforms.aspect.value = camera.aspect;
      uniforms.viewportHeight.value = height;
      const glyphSize = embedded ? Math.max(4, Math.min(7.5, Math.min(height, width * 1.15) / 124)) : 12;
      uniforms.size.value = glyphSize * renderer.getPixelRatio();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    let previous = performance.now();
    const limit = THREE.MathUtils.degToRad(25);
    function tick(now: number) {
      const delta = Math.min((now - previous) / 1000, .05);
      previous = now;
      const seconds = started ? (now - started) / 1000 : 0;
      const sway = embedded && !reduced ? Math.sin(seconds * .94) * .075 : 0;
      const manualYaw = embedded ? (drag ? target : 0) : target;
      yaw = THREE.MathUtils.damp(yaw, manualYaw, 10, delta);
      pitch = THREE.MathUtils.damp(pitch, targetPitch, 10, delta);
      zoom = THREE.MathUtils.damp(zoom, targetZoom, 12, delta);
      camera.position.z = fitDistance / zoom;
      figure.rotation.set(pitch, restingYaw + yaw + sway, 0);
      uniforms.clock.value = reduced ? 0 : seconds;
      const isLight = embedded ? document.documentElement.dataset.theme !== "dark" : palette.current;
      uniforms.lightTheme.value = isLight ? 1 : 0;
      for (const echo of echoes) echo.z += delta;
      uniforms.assembly.value = reduced ? 1 : THREE.MathUtils.smoothstep(seconds, 0, 1.2);
      uniforms.ink.value.set(isLight ? (embedded ? "#51514d" : "#151515") : "#f0ede6");
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    function move(event: PointerEvent) {
      if (!embedded) {
        const finger = fingers.get(event.pointerId);
        if (!finger) return;
        const dx = event.clientX - finger.x;
        const dy = event.clientY - finger.y;
        finger.set(event.clientX, event.clientY);
        if (fingers.size > 1) {
          const [a, b] = fingers.values();
          const distance = a.distanceTo(b);
          if (pinchDistance > 0 && distance > 0) changeZoom(distance / pinchDistance);
          pinchDistance = distance;
        } else {
          target += dx * .008;
          targetPitch = THREE.MathUtils.clamp(targetPitch + dy * .006, -1.15, 1.15);
        }
        return;
      }
      const rect = host.getBoundingClientRect();
      if (!reduced) {
        cursor.set((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
        const now = performance.now();
        const traveled = Math.hypot((cursor.x - lastEcho.x) * rect.width, (cursor.y - lastEcho.y) * rect.height) * .5;
        if (now - lastEchoTime > 86 && traveled > 14) {
          echoes[echoIndex].set(cursor.x, cursor.y, 0);
          echoIndex = (echoIndex + 1) % echoes.length;
          lastEcho.copy(cursor);
          lastEchoTime = now;
        }
      }
      if (drag?.id === event.pointerId) {
        drag.moved ||= Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 6;
        if (drag.moved) target = THREE.MathUtils.clamp(drag.yaw + (event.clientX - drag.x) * .004, -limit, limit);
      }
    }
    function down(event: PointerEvent) {
      if (!embedded) {
        if (event.button !== 0 || fingers.size >= 2) return;
        fingers.set(event.pointerId, new THREE.Vector2(event.clientX, event.clientY));
        if (fingers.size === 2) {
          const [a, b] = fingers.values();
          pinchDistance = a.distanceTo(b);
        }
        host.setPointerCapture(event.pointerId);
        return;
      }
      if (drag || event.button !== 0 || event.target !== openViewer.current) return;
      target = yaw;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw, moved: false };
      host.setPointerCapture(event.pointerId);
    }
    function end(event: PointerEvent) {
      if (fingers.delete(event.pointerId)) pinchDistance = 0;
      if (drag?.id === event.pointerId) {
        const tap = event.type === "pointerup" && !drag.moved && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 6;
        drag = undefined;
        if (tap && started) openViewer.current?.click();
      }
      cursor.set(2, 2);
    }
    function changeZoom(factor: number) {
      targetZoom = THREE.MathUtils.clamp(targetZoom * factor, .75, 2.7);
    }
    function wheel(event: WheelEvent) {
      event.preventDefault();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? host.clientHeight : 1);
      changeZoom(Math.exp(-delta * .002));
    }
    function key(event: KeyboardEvent) {
      switch (event.key) {
        case "+": case "=": changeZoom(1.16); break;
        case "-": changeZoom(1 / 1.16); break;
        case "ArrowLeft": target -= .19; break;
        case "ArrowRight": target += .19; break;
        case "ArrowUp": targetPitch = Math.min(1.15, targetPitch + .16); break;
        case "ArrowDown": targetPitch = Math.max(-1.15, targetPitch - .16); break;
        case "0": targetZoom = 1; target = 0; targetPitch = 0; break;
        default: return;
      }
      event.preventDefault();
    }
    function leave() { cursor.set(2, 2); }
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointerup", end);
    host.addEventListener("pointercancel", end);
    host.addEventListener("lostpointercapture", end);
    host.addEventListener("pointerleave", leave);
    if (!embedded) {
      host.addEventListener("wheel", wheel, { passive: false });
      host.addEventListener("keydown", key);
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerup", end);
      host.removeEventListener("pointercancel", end);
      host.removeEventListener("lostpointercapture", end);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("wheel", wheel);
      host.removeEventListener("keydown", key);
      surface?.dispose();
      cloud?.dispose();
      depthMaterial.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [embedded]);

  if (embedded) return (
    <div
      ref={stage}
      data-knight-stage
      role="group"
      aria-label={ru ? "Интерактивный рыцарь из ASCII-символов" : "Interactive knight made of ASCII characters"}
      style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden", pointerEvents: "none" }}
    >
      <button
        ref={openViewer}
        type="button"
        className="knight-viewer-trigger"
        aria-label={ru ? "Рассмотреть рыцаря" : "View knight"}
        aria-haspopup="dialog"
        data-cursor-label={ru ? "РАССМОТРЕТЬ" : "VIEW KNIGHT"}
        onClick={(event) => { if (event.detail === 0) onOpen?.(); }}
      />
    </div>
  );

  return (
    <main style={{ minHeight: "100svh", position: "relative", isolation: "isolate", background: light ? "#f5f4ef" : "#0d0d0d", color: light ? "#151515" : "#f0ede6", fontFamily: "monospace" }}>
      <div style={{ position: "absolute", zIndex: 1, inset: "20px 20px auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 14, margin: 0 }}>{ru ? "ASCII / Рыцарь" : "ASCII / Knight"}</h1>
        <div style={{ display: "flex", gap: 8 }}>
        <button type="button" style={{ background: "transparent", color: "inherit", padding: "8px 14px", border: "1px solid currentColor", borderRadius: 20, cursor: "pointer" }} onClick={() => { palette.current = !light; setLight(!light); }}>
          {light ? (ru ? "Тёмная тема" : "Dark theme") : (ru ? "Светлая тема" : "Light theme")}
        </button>
        {onClose && <button type="button" onClick={onClose} aria-label={ru ? "Закрыть просмотр" : "Close viewer"} className="knight-viewer-close">×</button>}
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The 3D canvas handles keyboard navigation. */}
      <div ref={stage} data-knight-stage role="application" tabIndex={0} aria-label={ru ? "ASCII-рыцарь. Стрелки для поворота, плюс и минус для масштаба, ноль для сброса" : "ASCII knight. Arrow keys to rotate, plus and minus to zoom, zero to reset"} style={{ height: "100svh", overflow: "hidden", cursor: "grab", touchAction: "none" }} />
      <p role="status" style={{ position: "absolute", inset: "auto 16px max(16px, env(safe-area-inset-bottom))", textAlign: "center", margin: 0, pointerEvents: "none", fontSize: 12 }}>
        {status || (ru ? "Перетяни для поворота · Щипок или колесо для зума" : "Drag to rotate · Pinch or scroll to zoom")}
      </p>
    </main>
  );
}
