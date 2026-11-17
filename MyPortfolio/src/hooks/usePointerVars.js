import { useEffect } from "react";

/*
  Writes the cursor position to CSS variables --mx / --my on <html>
  (range -0.5 … 0.5). CSS uses them for the 3D tilt + orb parallax,
  so nothing re-renders while the mouse moves.
*/
export function usePointerVars() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        root.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
