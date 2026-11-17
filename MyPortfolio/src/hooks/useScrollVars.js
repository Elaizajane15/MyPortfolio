import { useEffect } from "react";

/*
  Writes scroll position to CSS variables on <html>:
    --sy  scrollY in px (unitless number)
    --sp  page progress 0 … 1
  Used for the progress bar and the hero scroll-out effect.
*/
export function useScrollVars() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--sy", window.scrollY.toFixed(0));
      root.style.setProperty("--sp", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
