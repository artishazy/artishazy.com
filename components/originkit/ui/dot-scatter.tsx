"use client";

import {useEffect, useRef} from "react";

type DotScatterProps = {
  text?: string;
  cursorRadius?: number;
  className?: string;
};

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
};

const GLYPHS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  G: ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  d: ["00001", "00001", "01111", "10001", "10001", "10011", "01101"],
  a: ["00000", "00000", "01110", "00001", "01111", "10001", "01111"],
  e: ["00000", "00000", "01110", "10001", "11111", "10000", "01111"],
  g: ["00000", "00000", "01110", "10001", "01111", "00001", "01110"],
  h: ["10000", "10000", "10110", "11001", "10001", "10001", "10001"],
  i: ["00100", "00000", "01100", "00100", "00100", "00100", "01110"],
  n: ["00000", "00000", "11110", "10001", "10001", "10001", "10001"],
  r: ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
  s: ["00000", "00000", "01111", "10000", "01110", "00001", "11110"],
  t: ["00100", "00100", "11111", "00100", "00100", "00101", "00010"],
  y: ["00000", "00000", "10001", "10001", "01111", "00001", "01110"],
  z: ["00000", "00000", "11111", "00010", "00100", "01000", "11111"],
  _: ["00000", "00000", "00000", "00000", "00000", "00000", "11111"],
};

function buildParticles(text: string, width: number, height: number): Particle[] {
  const letters = [...text].filter(letter => GLYPHS[letter]);
  if (!letters.length) return [];

  const letterGap = letters.length > 8 ? 1 : 2;
  const columns = letters.length * 5 + (letters.length - 1) * letterGap;
  const unit = Math.min((width * .94) / columns, (height * .72) / 7);
  const rowUnit = Math.min((height * .9) / 7, unit * 2.25);
  const startX = (width - columns * unit) / 2;
  const startY = (height - 7 * rowUnit) / 2;
  const particles: Particle[] = [];

  letters.forEach((letter, letterIndex) => {
    const glyph = GLYPHS[letter];
    const letterX = startX + letterIndex * (5 + letterGap) * unit;

    glyph.forEach((row, rowIndex) => {
      let column = 0;
      while (column < row.length) {
        if (row[column] === "0") {
          column += 1;
          continue;
        }

        let run = 1;
        while (row[column + run] === "1") run += 1;
        const particleHeight = Math.max(3, unit * .52);
        const particleWidth = run === 1 ? particleHeight : unit * (run - .18);
        const homeX = letterX + (column + run / 2) * unit;
        const homeY = startY + (rowIndex + .5) * rowUnit;
        particles.push({homeX, homeY, x: homeX, y: homeY, vx: 0, vy: 0, width: particleWidth, height: particleHeight});
        column += run;
      }
    });
  });

  return particles;
}

export function DotScatter({text = "DESIGN", cursorRadius = 120, className = ""}: DotScatterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({x: -1000, y: -1000, active: false});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let color = "#fff";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = rect.width;
      cssHeight = rect.height;
      canvas.width = Math.round(cssWidth * ratio);
      canvas.height = Math.round(cssHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      color = getComputedStyle(canvas).color;
      particlesRef.current = buildParticles(text, cssWidth, cssHeight);
    };

    const draw = () => {
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.fillStyle = color;
      const pointer = pointerRef.current;

      particlesRef.current.forEach(particle => {
        if (!reducedMotion.matches && pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < cursorRadius) {
            const force = (1 - distance / cursorRadius) * 1.45;
            particle.vx += (dx / distance) * force + (Math.random() - .5) * .28;
            particle.vy += (dy / distance) * force + (Math.random() - .5) * .28;
          }
        }

        particle.vx += (particle.homeX - particle.x) * .025;
        particle.vy += (particle.homeY - particle.y) * .025;
        particle.vx *= .9;
        particle.vy *= .9;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const radius = particle.height / 2;
        context.beginPath();
        context.roundRect(particle.x - particle.width / 2, particle.y - particle.height / 2, particle.width, particle.height, radius);
        context.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {x: event.clientX - rect.left, y: event.clientY - rect.top, active: true};
    };
    const leave = () => { pointerRef.current.active = false; };
    const root = document.documentElement;
    if (!root) return;

    const observer = new ResizeObserver(resize);
    const syncTheme = () => { color = getComputedStyle(canvas).color; };
    observer.observe(canvas);
    addEventListener("aih-theme-change", syncTheme);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    resize();
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("aih-theme-change", syncTheme);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [cursorRadius, text]);

  return <canvas ref={canvasRef} className={`dot-scatter ${className}`.trim()} aria-label={text}/>;
}
