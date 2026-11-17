import {flushSync} from "react-dom";

const glyphs = ".:;+-=*/#%@";
const duration = 900;
let active = false;

export function animateThemeChange(changeTheme: () => void) {
  if (active) return;

  const root = document.documentElement;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    changeTheme();
    return;
  }

  const overlay = document.createElement("div");
  const width = root.clientWidth;
  const height = root.clientHeight;
  const cell = width < 600 ? 10 : 12;
  const margin = cell * 8;
  const rows = Math.ceil(height / cell);
  const start = width + margin;
  const end = -width - margin;
  const scale = Math.min(devicePixelRatio, width < 600 ? 1.25 : 1.5);

  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.className = "theme-transition-glyphs";
  canvas.setAttribute("aria-hidden", "true");
  overlay.className = "theme-transition-overlay";
  overlay.setAttribute("aria-hidden", "true");

  context.scale(scale, scale);
  context.font = `600 ${cell}px monospace`;
  context.textBaseline = "middle";
  const oldInk = getComputedStyle(root).color;
  const newInk = root.dataset.theme === "dark" ? "#11110f" : "#f2f2ee";
  const edges = Array.from({length: rows}, (_, row) => {
    const ripple = Math.sin(row * 0.21) * 2 + Math.sin(row * 0.73) + Math.sin(row * 2.4) * 0.5;
    const verticalProgress = row * cell / height;
    return Math.round((width * verticalProgress) / cell + ripple) * cell;
  });
  const polygon = (offset: number) => {
    const edge = edges.flatMap((x, row) => [
      `${x + offset}px ${row * cell}px`,
      `${x + offset}px ${Math.min((row + 1) * cell, height)}px`,
    ]);
    return `polygon(${width + margin}px 0, ${edge.join(", ")}, ${width + margin}px 100%)`;
  };

  edges.forEach((edge, row) => {
    for (let column = -3; column <= 4; column++) {
      const noise = (Math.sin(row * 127.1 + column * 311.7) * 43758.5453) % 1;
      const density = 1 - Math.abs(column) / 5;
      if (Math.abs(noise) > density) continue;

      const glyph = glyphs[Math.floor(Math.abs(noise) / density * glyphs.length) % glyphs.length];
      context.fillStyle = column < 0 ? oldInk : newInk;
      context.globalAlpha = 0.25 + density * 0.65;
      context.fillText(glyph, edge + column * cell + 1, (row + 0.5) * cell);
    }
  });
  context.globalAlpha = 1;

  active = true;
  root.dataset.themeTransition = "";
  document.body.append(overlay, canvas);

  const timing: KeyframeAnimationOptions = {
    duration,
    easing: "cubic-bezier(.45, 0, .25, 1)",
    fill: "both",
  };
  const wipe = overlay.animate([
    {clipPath: polygon(start)},
    {clipPath: polygon(end)},
  ], timing);
  const glyphSweep = canvas.animate([
    {transform: `translateX(${start}px)`},
    {transform: `translateX(${end}px)`},
  ], timing);

  let completed = false;
  let fallbackTimer = 0;
  const finish = () => {
    if (completed) return;
    completed = true;
    clearTimeout(fallbackTimer);
    flushSync(changeTheme);
    wipe.cancel();
    glyphSweep.cancel();
    overlay.remove();
    canvas.remove();
    delete root.dataset.themeTransition;
    active = false;
  };

  fallbackTimer = window.setTimeout(finish, duration + 200);
  void Promise.all([wipe.finished, glyphSweep.finished]).then(finish, finish);
}
