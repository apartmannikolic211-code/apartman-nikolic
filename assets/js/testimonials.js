/* Home testimonial carousel: two cards visible, auto-advances and loops. */
document.addEventListener("DOMContentLoaded", function () {
  const viewport = document.querySelector(".testimonial-carousel__viewport");
  if (!viewport) return;

  const intervalMs = 4500;
  let timer = null;

  function advance() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (viewport.scrollLeft >= maxScroll - 4) {
      viewport.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      viewport.scrollBy({ left: viewport.clientWidth, behavior: "smooth" });
    }
  }

  function start() { timer = setInterval(advance, intervalMs); }
  function stop() { clearInterval(timer); }

  start();
  viewport.addEventListener("mouseenter", stop);
  viewport.addEventListener("mouseleave", start);
  viewport.addEventListener("touchstart", stop, { passive: true });
  viewport.addEventListener("touchend", start);
});
