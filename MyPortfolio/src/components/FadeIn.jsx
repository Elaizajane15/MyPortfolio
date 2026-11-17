import { useRef } from "react";
import { useInView } from "../hooks/useInView";

/*
  Reveal-on-scroll wrapper.
  variant: "up" (default) | "left" | "right" | "zoom" | "flip" | "spin"
*/
export default function FadeIn({ children, delay = 0, variant = "up", className = "" }) {
  const ref = useRef(null);
  const v = useInView(ref);
  const classes = ["fade-in", `fx-${variant}`, v ? "in" : "", className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
