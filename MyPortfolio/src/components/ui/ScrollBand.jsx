import { useEffect, useRef } from "react";

/*
  Big tilted gradient strip whose text slides sideways as you scroll.
  Two rows move in opposite directions.
*/
export default function ScrollBand({ words }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => el.style.setProperty("--off", el.getBoundingClientRect().top.toFixed(0));
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const line = Array.from({ length: 6 }, () => words).flat();

  return (
    <div className="band" ref={ref} aria-hidden="true">
      <div className="band-track">
        <div className="band-row">
          {line.map((w, i) => <span key={i}>{w}<i /></span>)}
        </div>
        <div className="band-row band-row-rev">
          {line.map((w, i) => <span key={i}>{w}<i /></span>)}
        </div>
      </div>
    </div>
  );
}
