import { useRef } from "react";
import { useInView } from "../hooks/useInView";

export default function SkillBar({ name, cat, pct, delay }) {
  const ref = useRef(null);
  const v = useInView(ref);
  const delayMs = Math.round(delay * 1000);
  const delayClass = `sd-${delayMs}`;
  const classes = ["skill", v ? "in" : "", delayClass].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes}>
      <div className="skill-head">
        <div className="skill-left">
          <span className="skill-cat">{cat}</span>
          <span className="skill-name">{name}</span>
        </div>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className={`skill-fill pct-${pct}`} />
      </div>
    </div>
  );
}
