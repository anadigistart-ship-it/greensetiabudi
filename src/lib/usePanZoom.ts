"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Opts = {
  imgW: number;
  imgH: number;
  fit: "cover" | "contain";
  initialScale: number;
  minScale: number;
  maxScale: number;
  /** putar pelan kiri-kanan saat tidak disentuh */
  auto?: boolean;
  /** jalankan loop animasi hanya saat true (mis. saat terlihat di layar) */
  active?: boolean;
  /** dipanggil tiap frame: heading 0-360 dan skala saat ini */
  onFrame?: (v: { heading: number; scale: number }) => void;
};

type Vec = { x: number; y: number };

/**
 * Pan + zoom ala viewer 360 untuk satu gambar.
 * - Seret 1 jari / mouse untuk menggeser (dengan inersia).
 * - Cubit 2 jari untuk zoom, ketuk dua kali untuk zoom cepat.
 * - Ctrl/Cmd + scroll untuk zoom di desktop, panah & +/- di keyboard.
 * Posisi ditulis langsung ke DOM (tanpa re-render) supaya halus di HP.
 */
export function usePanZoom(o: Opts) {
  const optsRef = useRef(o);
  optsRef.current = o;

  const stageRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const cur = useRef({ x: 0, y: 0, s: o.initialScale });
  const tgt = useRef({ x: 0, y: 0, s: o.initialScale });
  const size = useRef({ w: 1, h: 1 });
  const pointers = useRef(new Map<number, Vec>());
  const gesture = useRef<
    | { mode: "pan"; sx: number; sy: number; ox: number; oy: number; moved: boolean; lx: number; lt: number }
    | { mode: "pinch"; d0: number; s0: number; mx: number; my: number; ox: number; oy: number }
    | null
  >(null);
  const vel = useRef({ x: 0, y: 0 });
  const idleUntil = useRef(0);
  const dir = useRef(1);
  const lastTap = useRef({ t: 0, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);

  const geometry = (s: number) => {
    const { w, h } = size.current;
    const { imgW, imgH, fit } = optsRef.current;
    const base = fit === "cover" ? Math.max(w / imgW, h / imgH) : Math.min(w / imgW, h / imgH);
    const lw = imgW * base;
    const lh = imgH * base;
    return {
      lw,
      lh,
      maxX: Math.max(0, (lw * s - w) / 2),
      maxY: Math.max(0, (lh * s - h) / 2),
    };
  };

  const clampTarget = () => {
    const { minScale, maxScale } = optsRef.current;
    const t = tgt.current;
    t.s = Math.min(maxScale, Math.max(minScale, t.s));
    const g = geometry(t.s);
    t.x = Math.min(g.maxX, Math.max(-g.maxX, t.x));
    t.y = Math.min(g.maxY, Math.max(-g.maxY, t.y));
  };

  const resetView = useCallback(() => {
    const s = optsRef.current.initialScale;
    cur.current = { x: 0, y: 0, s };
    tgt.current = { x: 0, y: 0, s };
  }, []);

  // layer di-mount ulang tiap ganti scene: tampilan kembali ke awal
  const setLayer = useCallback(
    (n: HTMLDivElement | null) => {
      layerRef.current = n;
      if (n) resetView();
    },
    [resetView],
  );

  const setStage = useCallback((n: HTMLDivElement | null) => {
    stageRef.current = n;
  }, []);

  // ukuran stage
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => {
      const r = el.getBoundingClientRect();
      size.current = { w: Math.max(1, r.width), h: Math.max(1, r.height) };
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // loop animasi
  const active = o.active ?? true;
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const op = optsRef.current;
      const t = tgt.current;
      const c = cur.current;

      if (op.auto && !reduce && pointers.current.size === 0 && now > idleUntil.current) {
        const g = geometry(t.s);
        t.x += dir.current * dt * 0.022;
        if (t.x >= g.maxX) {
          t.x = g.maxX;
          dir.current = -1;
        } else if (t.x <= -g.maxX) {
          t.x = -g.maxX;
          dir.current = 1;
        }
      }

      clampTarget();
      const k = 1 - Math.exp(-dt / 105);
      c.x += (t.x - c.x) * k;
      c.y += (t.y - c.y) * k;
      c.s += (t.s - c.s) * k;

      const layer = layerRef.current;
      if (layer) {
        const g = geometry(c.s);
        layer.style.width = `${g.lw}px`;
        layer.style.height = `${g.lh}px`;
        layer.style.transform = `translate(-50%, -50%) translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) scale(${c.s.toFixed(4)})`;
        layer.style.setProperty("--inv", (1 / c.s).toFixed(4));
        if (op.onFrame) {
          const frac = g.maxX > 0 ? 0.5 - c.x / (2 * g.maxX) : 0.5;
          op.onFrame({ heading: Math.round(Math.min(1, Math.max(0, frac)) * 360), scale: c.s });
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const hold = () => {
    idleUntil.current = Number.POSITIVE_INFINITY;
    setTouched(true);
  };
  const release = () => {
    idleUntil.current = performance.now() + 4500;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    hold();
    const t = tgt.current;
    if (pointers.current.size === 1) {
      gesture.current = {
        mode: "pan",
        sx: e.clientX,
        sy: e.clientY,
        ox: t.x,
        oy: t.y,
        moved: false,
        lx: e.clientX,
        lt: performance.now(),
      };
      vel.current = { x: 0, y: 0 };
    } else if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      gesture.current = {
        mode: "pinch",
        d0: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        s0: t.s,
        mx: (a.x + b.x) / 2,
        my: (a.y + b.y) / 2,
        ox: t.x,
        oy: t.y,
      };
      setDragging(true);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    const t = tgt.current;

    if (g.mode === "pan" && pointers.current.size === 1) {
      const dx = e.clientX - g.sx;
      const dy = e.clientY - g.sy;
      if (!g.moved) {
        if (Math.hypot(dx, dy) < 6) return;
        g.moved = true;
        setDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* abaikan */
        }
      }
      const now = performance.now();
      const dt = Math.max(1, now - g.lt);
      vel.current.x = vel.current.x * 0.6 + ((e.clientX - g.lx) / dt) * 0.4;
      g.lx = e.clientX;
      g.lt = now;
      t.x = g.ox + dx;
      t.y = g.oy + dy;
    } else if (g.mode === "pinch" && pointers.current.size >= 2) {
      const [a, b] = Array.from(pointers.current.values());
      const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      t.s = g.s0 * (d / g.d0);
      t.x = g.ox + ((a.x + b.x) / 2 - g.mx);
      t.y = g.oy + ((a.y + b.y) / 2 - g.my);
    }
  };

  const endPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    const g = gesture.current;
    pointers.current.delete(e.pointerId);
    const t = tgt.current;

    if (pointers.current.size === 0) {
      setDragging(false);
      if (g && g.mode === "pan" && g.moved) {
        t.x += vel.current.x * 240; // inersia
        t.y += 0;
      } else if (g && g.mode === "pan" && !g.moved && e.type === "pointerup") {
        // ketuk dua kali = zoom
        const now = performance.now();
        const lt = lastTap.current;
        if (now - lt.t < 320 && Math.hypot(e.clientX - lt.x, e.clientY - lt.y) < 28) {
          const { initialScale, maxScale } = optsRef.current;
          const zoomedIn = t.s > initialScale * 1.4;
          const ns = zoomedIn ? initialScale : Math.min(maxScale, initialScale * 2);
          const r = stageRef.current?.getBoundingClientRect();
          if (r) {
            const px = e.clientX - (r.left + r.width / 2);
            const py = e.clientY - (r.top + r.height / 2);
            const ratio = ns / t.s;
            t.x = zoomedIn ? 0 : px - (px - t.x) * ratio;
            t.y = zoomedIn ? 0 : py - (py - t.y) * ratio;
          }
          t.s = ns;
          lastTap.current = { t: 0, x: 0, y: 0 };
        } else {
          lastTap.current = { t: now, x: e.clientX, y: e.clientY };
        }
      }
      gesture.current = null;
      release();
    } else if (pointers.current.size === 1) {
      // lepas satu jari setelah cubit: lanjut geser tanpa lompat
      const [p] = Array.from(pointers.current.values());
      gesture.current = {
        mode: "pan",
        sx: p.x,
        sy: p.y,
        ox: t.x,
        oy: t.y,
        moved: true,
        lx: p.x,
        lt: performance.now(),
      };
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const t = tgt.current;
    const step = 70;
    if (e.key === "ArrowLeft") t.x += step;
    else if (e.key === "ArrowRight") t.x -= step;
    else if (e.key === "ArrowUp") t.y += step;
    else if (e.key === "ArrowDown") t.y -= step;
    else if (e.key === "+" || e.key === "=") t.s *= 1.25;
    else if (e.key === "-") t.s /= 1.25;
    else if (e.key === "0") resetView();
    else return;
    e.preventDefault();
    hold();
    release();
  };

  // Ctrl/Cmd + scroll (dan cubit di trackpad) untuk zoom; scroll biasa tetap menggulir halaman
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      tgt.current.s *= Math.exp(-e.deltaY * 0.0025);
      hold();
      release();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoomBy = useCallback((f: number) => {
    tgt.current.s *= f;
    idleUntil.current = performance.now() + 4500;
    setTouched(true);
  }, []);

  const reset = useCallback(() => {
    const s = optsRef.current.initialScale;
    tgt.current = { x: 0, y: 0, s };
    idleUntil.current = performance.now() + 4500;
  }, []);

  return {
    setStage,
    setLayer,
    dragging,
    touched,
    zoomBy,
    reset,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      onPointerCancel: endPointer,
      onKeyDown,
    },
  };
}
