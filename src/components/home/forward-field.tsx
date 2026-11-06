"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a grid of short strokes that all point forward (right),
 * rippled by a slow wave travelling left to right. Near the pointer they swing
 * to aim at it, lengthen and warm to the accent colour.
 *
 * Canvas 2D, sleeps when off-screen, draws one static frame for reduced motion.
 */
export function ForwardField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let gap = 30;
    let raf = 0;
    let visible = true;
    // Pointer, eased toward its target for a soft follow.
    const target = { x: -9999, y: -9999 };
    const pointer = { x: -9999, y: -9999 };
    // Per-cell eased angle and heat, so strokes turn smoothly.
    let angles = new Float32Array(0);
    let heat = new Float32Array(0);
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gap = w < 640 ? 26 : 32;
      cols = Math.ceil(w / gap) + 1;
      rows = Math.ceil(h / gap) + 1;
      angles = new Float32Array(cols * rows);
      heat = new Float32Array(cols * rows);
    };

    const RADIUS = 220;
    // Strokes have no head, so angles wrap every half turn.
    const wrapHalf = (d: number) => {
      while (d > Math.PI / 2) d -= Math.PI;
      while (d < -Math.PI / 2) d += Math.PI;
      return d;
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      pointer.x += (target.x - pointer.x) * 0.12;
      pointer.y += (target.y - pointer.y) * 0.12;

      const time = reduced ? 0 : t * 0.00045;
      ctx.lineCap = "round";

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const i = gy * cols + gx;
          // Offset odd rows for a woven, less mechanical grid.
          const x = gx * gap + (gy % 2 ? gap / 2 : 0);
          const y = gy * gap;

          // Fade toward the left and the bottom, keeping the text side calm.
          const fadeX = Math.min(1, Math.max(0, (x / w - 0.18) / 0.5));
          const fadeY = 1 - Math.max(0, (y / h - 0.7) / 0.3);
          const base = fadeX * fadeY;
          if (base <= 0.01) continue;

          // Forward wave: a slight wobble around 0 rad (pointing right).
          let a = Math.sin(x * 0.006 - time * 2.2 + y * 0.004) * 0.35;
          let k = 0;

          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            k = 1 - d / RADIUS;
            k = k * k * (3 - 2 * k);
            a = a + wrapHalf(Math.atan2(dy, dx) - a) * k;
          }

          // Ease angle and heat per cell.
          angles[i] += wrapHalf(a - angles[i]) * (reduced ? 1 : 0.18);
          heat[i] += (k - heat[i]) * (reduced ? 1 : 0.12);
          const hk = heat[i];

          const len = 7 + hk * 9;
          const ca = Math.cos(angles[i]);
          const sa = Math.sin(angles[i]);
          const alpha = (0.14 + hk * 0.75) * base;

          ctx.strokeStyle =
            hk > 0.05
              ? `rgba(${Math.round(243 + (255 - 243) * hk)},${Math.round(241 + (90 - 241) * hk)},${Math.round(236 + (54 - 236) * hk)},${alpha})`
              : `rgba(243,241,236,${alpha})`;
          ctx.lineWidth = 1 + hk * 0.6;
          ctx.beginPath();
          ctx.moveTo(x - ca * len * 0.5, y - sa * len * 0.5);
          ctx.lineTo(x + ca * len * 0.5, y + sa * len * 0.5);
          ctx.stroke();
        }
      }
    };

    const loop = (t: number) => {
      raf = 0;
      if (!visible) return;
      draw(t);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (reduced) {
        pointer.x = target.x;
        pointer.y = target.y;
        draw(0);
      }
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
      if (reduced) {
        pointer.x = target.x;
        pointer.y = target.y;
        draw(0);
      }
    };

    resize();
    draw(0);
    start();

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(parent);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
    });
    io.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={"pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")}
    />
  );
}
