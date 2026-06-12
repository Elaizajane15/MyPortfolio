import { useState, useEffect } from "react";

export function useTyping(words) {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi] ?? "";
    let t;
    if (!del && ci < w.length)     t = setTimeout(() => setCi(c => c + 1), 90);
    else if (!del)                  t = setTimeout(() => setDel(true), 2200);
    else if (del && ci > 0)         t = setTimeout(() => setCi(c => c - 1), 45);
    else                            t = setTimeout(() => { setDel(false); setWi(i => (i + 1) % words.length); }, 0);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return (words[wi] ?? "").slice(0, ci);
}
