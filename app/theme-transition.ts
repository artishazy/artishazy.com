import {flushSync} from "react-dom";

const glyphs = ".:;+-=*/#%@";
let active = false;

export function animateThemeChange(changeTheme: () => void) {
  if (active) return;

  const root = document.documentElement;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context || !document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    changeTheme();
    return;
  }

  const width = root.clientWidth;
  const height = root.clientHeight;
  const cell = width < 600 ? 10 : 12;
  const margin = cell * 8;
  const rows = Math.ceil(height / cell);
  const start = width + margin;
  const end = -width - margin * 2;
  const canvasWidth = width + margin * 2;
  const scale = Math.min(devicePixelRatio, 2);
  canvas.width = Math.ceil(canvasWidth * scale);
  canvas.height = Math.ceil(height * scale);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${height}px`;
  canvas.className = "theme-transition-glyphs";
  canvas.setAttribute("aria-hidden", "true");

  context.scale(scale, scale);
  context.font = `600 ${cell}px monospace`;
  context.textBaseline = "middle";
  const oldInk = getComputedStyle(root).color;
  const edges = Array.from({length: rows}, (_, row) => {
    const ripple = Math.sin(row * 0.21) * 2 + Math.sin(row * 0.73) + Math.sin(row * 2.4) * 0.5;
    const verticalProgress = row * cell / height;
    return Math.round((margin / 2 + width * verticalProgress) / cell + ripple) * cell;
  });
  const polygon = (offset: number) => {
    const edge = edges.flatMap((x, row) => [
      `${x + offset}px ${row * cell}px`,
      `${x + offset}px ${Math.min((row + 1) * cell, height)}px`,
    ]);
    return `polygon(${start + canvasWidth}px 0, ${edge.join(", ")}, ${start + canvasWidth}px 100%)`;
  };

  active = true;
  root.dataset.themeTransition = "";
  root.style.setProperty("--theme-wipe-from", polygon(start));
  root.style.setProperty("--theme-wipe-to", polygon(end));
  root.style.setProperty("--theme-glyphs-from", `${start}px`);
  root.style.setProperty("--theme-glyphs-to", `${end}px`);

  const transition = document.startViewTransition(() => {
    flushSync(changeTheme);
    const newInk = getComputedStyle(root).color;

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
    document.body.append(canvas);
  });

  const cleanup = () => {
    canvas.remove();
    delete root.dataset.themeTransition;
    root.style.removeProperty("--theme-wipe-from");
    root.style.removeProperty("--theme-wipe-to");
    root.style.removeProperty("--theme-glyphs-from");
    root.style.removeProperty("--theme-glyphs-to");
    active = false;
  };
  void transition.ready.catch(() => {});
  void transition.finished.then(cleanup, cleanup);
}
