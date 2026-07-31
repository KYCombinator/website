"use client";

import { useEffect } from "react";

// Posts the embed's content height to the parent window so the host page can
// size the iframe exactly (no hard-coded heights, no inner scrollbar):
//   window.parent.postMessage({ type: "kyx:resize", height }, "*")
// Uses ResizeObserver + MutationObserver + a light polling fallback so it works
// across browsers even when the form grows/shrinks (errors, success, textareas).
export default function EmbedAutoHeight() {
  useEffect(() => {
    let last = 0;
    const measure = () =>
      Math.ceil(
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.getBoundingClientRect().height
        )
      );
    const post = () => {
      const h = measure();
      if (h && h !== last) {
        last = h;
        window.parent?.postMessage({ type: "kyx:resize", height: h }, "*");
      }
    };

    post();
    const ro = new ResizeObserver(post);
    ro.observe(document.documentElement);
    ro.observe(document.body);
    const mo = new MutationObserver(post);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
    window.addEventListener("load", post);
    window.addEventListener("resize", post);
    const iv = setInterval(post, 400);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("load", post);
      window.removeEventListener("resize", post);
      clearInterval(iv);
    };
  }, []);
  return null;
}
