import { useState, useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*";

/* Letter-scramble reveal. Returns [displayText, replay]. */
export function useScramble(text, autoplay = true) {
  const [out, setOut] = useState(text);
  const timer = useRef(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearInterval(timer.current);
    let n = 0;
    timer.current = setInterval(() => {
      setOut(
        text
          .split("")
          .map((c, i) => (/[\s,'.&]/.test(c) || i < n ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      n += 0.6;
      if (n > text.length) {
        clearInterval(timer.current);
        setOut(text);
      }
    }, 40);
  }, [text]);

  useEffect(() => {
    if (autoplay) run();
    return () => clearInterval(timer.current);
  }, [run, autoplay]);

  return [out, run];
}
