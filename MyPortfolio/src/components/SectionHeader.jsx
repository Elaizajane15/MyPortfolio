import { useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import { useInView } from "../hooks/useInView";
import { useScramble } from "../hooks/useScramble";

/* Big chrome heading at the top of each one-page section.
   The title scrambles in when the section scrolls into view. */
export default function SectionHeader({ eyebrow, title, subtitle }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [shown, replay] = useScramble(title.toUpperCase(), false);

  useEffect(() => {
    if (seen) replay();
  }, [seen, replay]);

  return (
    <div className="section-head" ref={ref}>
      <FadeIn>
        <span className="section-kicker">{eyebrow}</span>
        <h2 className="section-title chrome" aria-label={title} onPointerEnter={replay}>
          <span aria-hidden="true">{shown}</span>
        </h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="section-underline" />
      </FadeIn>
    </div>
  );
}
