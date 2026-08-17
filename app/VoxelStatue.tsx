"use client";
import {useEffect,useRef} from "react";
import * as THREE from "three";

export default function VoxelStatue(){
  const mount=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const host=mount.current;if(!host)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,.4,10);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
    const group=new THREE.Group();group.rotation.y=-.18;scene.add(group);
    const materials={
      bun:new THREE.MeshStandardMaterial({color:0xf29b38,roughness:.72}),
      bunLight:new THREE.MeshStandardMaterial({color:0xffbd55,roughness:.68}),
      crust:new THREE.MeshStandardMaterial({color:0xc96824,roughness:.78}),
      sesame:new THREE.MeshStandardMaterial({color:0xffe3a1,roughness:.8}),
      lettuce:new THREE.MeshStandardMaterial({color:0x5ccd43,roughness:.82}),
      lettuceDark:new THREE.MeshStandardMaterial({color:0x249b42,roughness:.86}),
      tomato:new THREE.MeshStandardMaterial({color:0xf03b38,roughness:.7}),
      cheese:new THREE.MeshStandardMaterial({color:0xffd52f,roughness:.65}),
      patty:new THREE.MeshStandardMaterial({color:0x5a281d,roughness:.94}),
      sauce:new THREE.MeshStandardMaterial({color:0xf7e5c3,roughness:.7}),
    };
    const addBox=(x:number,y:number,z:number,sx:number,sy:number,sz:number,mat=materials.bun,rot=0)=>{
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat);mesh.position.set(x,y,z);mesh.rotation.z=rot;mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;
    };
    // Bottom bun: a chunky square base with a toasted crust.
    addBox(0,-2.28,0,4.15,.68,2.72,materials.crust);
    addBox(0,-1.91,.02,3.85,.42,2.58,materials.bun);

    // Patty, sauce and bright vegetable layers.
    addBox(0,-1.35,0,4.32,.72,2.82,materials.patty);
    addBox(-1.45,-.93,1.18,1.05,.18,.3,materials.sauce);
    addBox(.1,-.91,1.2,1.34,.22,.32,materials.sauce);
    addBox(1.54,-.94,1.18,.68,.16,.3,materials.sauce);
    addBox(0,-.72,0,4.08,.34,2.7,materials.tomato);

    // Pixel cheese corners deliberately overhang the square burger.
    addBox(0,-.38,.03,4.45,.26,2.82,materials.cheese);
    addBox(-2.12,-.57,.05,.55,.55,2.3,materials.cheese,-.12);
    addBox(2.12,-.55,.05,.55,.52,2.32,materials.cheese,.12);
    addBox(0,-.64,1.42,.65,.5,.28,materials.cheese);

    // Jagged lettuce is assembled from offset voxels.
    [[-1.72,.02,.05,.95],[-.83,.08,.02,1.15],[.2,.01,.08,1.08],[1.18,.09,.02,1.18],[1.84,.01,.08,.72]].forEach(([x,y,z,w],i)=>
      addBox(x,y,z,w,.38,2.98,i%2?materials.lettuce:materials.lettuceDark,i%2?.08:-.08)
    );
    addBox(-2.16,-.02,.2,.42,.5,1.55,materials.lettuce);
    addBox(2.12,.03,-.05,.5,.46,1.72,materials.lettuceDark);

    // A stepped square top bun keeps the voxel sculpture silhouette.
    addBox(0,.52,0,4.18,.58,2.74,materials.crust);
    addBox(0,1.06,0,4.02,.72,2.66,materials.bun);
    addBox(0,1.64,-.02,3.68,.5,2.5,materials.bunLight);
    addBox(0,2.02,-.04,3.08,.3,2.2,materials.bunLight);

    // Oversized voxel sesame seeds, readable even at mobile scale.
    [[-1.18,2.23,.55],[-.5,2.34,1.02],[.2,2.3,.62],[.92,2.2,1.04],[1.32,1.88,1.2],[-1.45,1.78,1.18]].forEach(([x,y,z],i)=>
      addBox(x,y,z,.34,.13,.18,materials.sesame,i%2?.24:-.2)
    );

    // A few floating crumbs preserve the original eroded/glitch character.
    [[-2.42,1.62,.2,.18],[2.5,.74,.3,.23],[-2.38,-1.04,.42,.14],[2.45,-1.62,.1,.18],[-2.2,.58,-.5,.12]].forEach(([x,y,z,s],i)=>
      addBox(x,y,z,s,s*(i%2?1.45:1),s, i%2?materials.cheese:materials.bunLight)
    );
    const hemi=new THREE.HemisphereLight(0xffffff,0x222222,2.2);scene.add(hemi);
    const key=new THREE.DirectionalLight(0xffffff,3.8);key.position.set(-4,6,7);key.castShadow=true;scene.add(key);
    const rim=new THREE.DirectionalLight(0xffffff,2.2);rim.position.set(5,1,-4);scene.add(rim);
    let tx=-.18,ty=.02,raf=0,time=0;
    const pointer=(e:PointerEvent)=>{const r=host.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*.75;ty=((e.clientY-r.top)/r.height-.5)*.28};
    const leave=()=>{tx=-.18;ty=.02};host.addEventListener("pointermove",pointer);host.addEventListener("pointerleave",leave);
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};const ro=new ResizeObserver(resize);ro.observe(host);resize();
    const animate=()=>{time+=.008;group.rotation.y+=(tx-group.rotation.y)*.045;group.rotation.x+=(ty-group.rotation.x)*.045;group.position.y=Math.sin(time)*.055;renderer.render(scene,camera);raf=requestAnimationFrame(animate)};animate();
    return()=>{cancelAnimationFrame(raf);ro.disconnect();host.removeEventListener("pointermove",pointer);host.removeEventListener("pointerleave",leave);renderer.dispose();scene.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose()});Object.values(materials).forEach(material=>material.dispose());renderer.domElement.remove()};
  },[]);
  return <div ref={mount} className="webgl-statue" role="img" aria-label="Интерактивный красочный пиксельный 3D-бургер"/>;
}
