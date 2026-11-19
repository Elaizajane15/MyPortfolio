import { useRef } from "react";
import { useInView } from "../../hooks/useInView";

export default function SkillBar({ name, cat, pct, delay = 0 }) {
  const ref = useRef(null);
  const v = useInView(ref);
  const hasPct = typeof pct === "number";
  const classes = ["skill", v ? "in" : "", hasPct ? "" : "skill-nobar"].filter(Boolean).join(" ");
  return (
    <div
      ref={ref}
      className={classes}
      style={{ "--pct": hasPct ? `${pct}%` : "0%", "--d": `${delay}s` }}
    >
      <div className="skill-head">
        <div className="skill-left">
          <span className="skill-cat">{cat}</span>
          <span className="skill-name">{name}</span>
        </div>
        {hasPct && <span className="skill-pct">{pct}%</span>}
      </div>
      {hasPct && (
        <div className="skill-track">
          <div className="skill-fill" />
        </div>
      )}
    </div>
  );
}
