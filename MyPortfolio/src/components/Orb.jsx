/*
  Glossy 3D orb used for decoration.
  a/b/c = highlight / mid / shadow colors
  shape = "" (sphere) | "sq" (rounded cube) | "ring" (torus)
  s     = parallax strength (px moved as the cursor crosses the screen)
*/
export default function Orb({ a, b, c, size = 80, shape = "", s = 0, float = true, className = "", style }) {
  const classes = ["orb", shape, float ? "fl" : "", className].filter(Boolean).join(" ");
  return (
    <span
      aria-hidden="true"
      className={classes}
      style={{ "--a": a, "--b": b, "--c": c, "--s": s, "--w": `${size}px`, width: size, height: size, ...style }}
    />
  );
}
