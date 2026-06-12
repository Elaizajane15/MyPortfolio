import { useRef } from "react";
import { useInView } from "../hooks/useInView";

export default function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const v = useInView(ref);
  const delayMs = Math.round(delay * 1000);
  const delayClass = delayMs ? `fd-${delayMs}` : "";
  const classes = ["fade-in", v ? "in" : "", delayClass, className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
