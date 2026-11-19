import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/*
  Wraps a card so it tilts toward the mouse in 3D, with a light glare that
  follows the cursor. Children marked with the CSS class "tilt-pop" (see App.css)
  float above the card for a layered, 3D look.
  Only reacts to a real mouse; touch screens and reduced-motion users get a normal card.
*/

const MotionDiv = motion.div;
const MotionSpan = motion.span;
export default function TiltCard({ children, max = 12, className = "" }) {
  const reduced = useReducedMotion();

  // Cursor position over the card, 0..1 (0.5 = center)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);

  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)`;
  const glareOpacity = useSpring(0, spring);

  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <MotionDiv
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
    >
      {children}
      <MotionSpan className="tilt-glare" aria-hidden="true" style={{ background: glare, opacity: glareOpacity }} />
    </MotionDiv>
  );
}
