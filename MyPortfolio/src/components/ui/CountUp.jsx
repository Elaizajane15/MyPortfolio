import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

/* Counts a value like "4+" up from 0 when it scrolls into view. */
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const target = parseInt(value, 10) || 0;
  const suffix = String(value).replace(/^\d+/, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setN(target));
      return () => cancelAnimationFrame(id);
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, target, duration]);

  return <span ref={ref}>{n}{suffix}</span>;
}
