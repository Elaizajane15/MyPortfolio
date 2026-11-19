import { useEffect, useRef } from "react";

/*
  Full-page animated background: a glowing purple / cyan particle network
  with flowing "stardust" ribbons.
  - Nodes drift and link to nearby nodes.
  - The cursor links to nearby nodes, pushes them away gently and lights up a glow.
  - Clicking sends out a ripple that knocks nodes outward.
  - Scrolling shifts the layers a little for depth.
  It pauses when the tab is hidden and draws a single still frame for
  users who prefer reduced motion.
*/

const COLORS = ["#8a3ffc", "#b46bff", "#22d3ee", "#ff2d9a", "#6d5dfc"];
const LINK_DIST = 140;
const MOUSE_DIST = 190;

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1;
    let nodes = [];
    let dust = [];
    let ripples = [];
    let raf = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const rand = (a, b) => a + Math.random() * (b - a);

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(130, Math.round((w * h) / 11000));
      nodes = Array.from({ length: count }, () => {
        const big = Math.random() < 0.08;
        return {
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.25, 0.25),
          vy: rand(-0.25, 0.25),
          r: big ? rand(3, 4.5) : rand(1, 2.2),
          big,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          depth: rand(0.3, 1),
          phase: rand(0, Math.PI * 2),
        };
      });

      // Dust sits along two flowing ribbons, like the purple streams in the reference.
      const perRibbon = w < 700 ? 140 : 260;
      dust = [];
      for (let k = 0; k < 2; k++) {
        for (let i = 0; i < perRibbon; i++) {
          dust.push({
            ribbon: k,
            u: Math.random(),
            off: (Math.random() - 0.5) * (Math.random() * 120),
            s: rand(0.5, 1.8),
            a: rand(0.25, 0.9),
            speed: rand(0.00004, 0.00012),
          });
        }
      }
    }

    // Position on ribbon k at progress u (0..1) and time t.
    function ribbon(k, u, time) {
      if (k === 0) {
        const x = u * (w + 200) - 100;
        const y = h * 0.28 + Math.sin(u * 5 + time * 0.0004) * h * 0.12 + Math.sin(u * 13 + time * 0.0007) * 18;
        return [x, y];
      }
      const x = w - (u * (w + 200) - 100);
      const y = h * 0.74 + Math.cos(u * 4 + time * 0.0003) * h * 0.1 + Math.sin(u * 11 - time * 0.0006) * 22;
      return [x, y];
    }

    function frame(now) {
      t = now || 0;
      const scrollY = window.scrollY;
      ctx.clearRect(0, 0, w, h);

      // Ease the mouse so links and the glow trail smoothly.
      mouse.x += (mouse.tx - mouse.x) * 0.15;
      mouse.y += (mouse.ty - mouse.y) * 0.15;

      ctx.globalCompositeOperation = "lighter";

      // Stardust ribbons
      for (const d of dust) {
        d.u = (d.u + d.speed * 16) % 1;
        const [rx, ry] = ribbon(d.ribbon, d.u, t);
        const x = rx;
        const y = ry + d.off - (scrollY * 0.08) % h;
        const tw = 0.6 + 0.4 * Math.sin(t * 0.003 + d.u * 50);
        ctx.fillStyle = d.ribbon === 0
          ? `rgba(190, 110, 255, ${d.a * tw})`
          : `rgba(80, 200, 255, ${d.a * tw * 0.8})`;
        ctx.fillRect(x, y, d.s, d.s);
      }

      // Scroll parallax per node depth (on-screen y)
      const py = (n) => {
        let y = n.y - (scrollY * 0.15 * n.depth) % (h + 40);
        if (y < -20) y += h + 40;
        return y;
      };

      // Move nodes
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (mouse.active) {
          const dx = n.x - mouse.x, dy = py(n) - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0.1) {
            const f = (1 - dist / 110) * 0.6;
            n.x += (dx / dist) * f;
            n.y += (dy / dist) * f;
          }
        }
        for (const rp of ripples) {
          const dx = n.x - rp.x, dy = py(n) - rp.y;
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - rp.r) < 30 && dist > 0.1) {
            n.vx += (dx / dist) * 0.06 * rp.life;
            n.vy += (dy / dist) * 0.06 * rp.life;
          }
        }
        // Cap the speed so ripples die down
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 0.6) { n.vx *= 0.96; n.vy *= 0.96; }
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }

      // Links between nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i], ay = py(a);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], by = py(b);
          const dx = a.x - b.x, dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.35;
            ctx.strokeStyle = `rgba(140, 110, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, by);
            ctx.stroke();
          }
        }
      }

      // Cursor glow and links to the cursor
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, "rgba(138, 63, 252, 0.22)");
        g.addColorStop(0.5, "rgba(34, 211, 238, 0.06)");
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);

        ctx.lineWidth = 1;
        for (const n of nodes) {
          const ny = py(n);
          const dist = Math.hypot(n.x - mouse.x, ny - mouse.y);
          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.8;
            const grad = ctx.createLinearGradient(mouse.x, mouse.y, n.x, ny);
            grad.addColorStop(0, `rgba(34, 211, 238, ${alpha})`);
            grad.addColorStop(1, `rgba(180, 107, 255, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, ny);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const ny = py(n);
        const pulse = 0.75 + 0.25 * Math.sin(t * 0.002 + n.phase);
        const near = mouse.active && Math.hypot(n.x - mouse.x, ny - mouse.y) < MOUSE_DIST;
        const r = n.r * (near ? 1.5 : 1);

        // soft halo
        const halo = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, r * 6);
        halo.addColorStop(0, hexA(n.c, 0.45 * pulse));
        halo.addColorStop(1, hexA(n.c, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, ny, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = hexA("#ffffff", 0.85 * pulse);
        ctx.beginPath();
        ctx.arc(n.x, ny, r * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // ring on the big "hub" nodes
        if (n.big) {
          ctx.strokeStyle = hexA(n.c, 0.8 * pulse);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(n.x, ny, r * 2.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Click ripples
      ripples = ripples.filter((rp) => rp.life > 0);
      for (const rp of ripples) {
        rp.r += 6;
        rp.life -= 0.02;
        ctx.strokeStyle = `rgba(180, 107, 255, ${rp.life * 0.6})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    function hexA(hex, a) {
      const n = parseInt(hex.slice(1), 16);
      return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
    }

    const onMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      if (!mouse.active) { mouse.x = e.clientX; mouse.y = e.clientY; }
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    const onDown = (e) => {
      if (!reduced) ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
    };
    const onResize = () => { build(); if (reduced) frame(0); };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(frame);
    };

    build();
    if (reduced) frame(0);
    else raf = requestAnimationFrame(frame);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="net-bg" aria-hidden="true">
      <div className="net-nebula net-nebula-a" />
      <div className="net-nebula net-nebula-b" />
      <div className="net-nebula net-nebula-c" />
      <canvas ref={canvasRef} className="net-canvas" />
    </div>
  );
}
