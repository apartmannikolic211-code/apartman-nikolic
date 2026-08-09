/* Apartman Nikolić — gallery filter + lightbox */

function initGallery() {
  const filterBtns = Array.from(document.querySelectorAll(".gallery-filter button"));
  const figures = Array.from(document.querySelectorAll(".gallery-grid figure"));
  const lightbox = document.getElementById("lightbox");
  if (!figures.length || !lightbox) return;

  const lightboxImg = document.getElementById("lightboxImg");
  let visibleSrcs = [];
  let currentIndex = 0;

  function applyFilter(cat) {
    figures.forEach(function (f) {
      const show = cat === "all" || f.getAttribute("data-category") === cat;
      f.style.display = show ? "" : "none";
    });
    filterBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-filter") === cat ? "true" : "false");
    });
  }

  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () { applyFilter(b.getAttribute("data-filter")); });
  });

  function currentVisibleSrcs() {
    return figures.filter(function (f) { return f.style.display !== "none"; })
      .map(function (f) { return f.querySelector("img").getAttribute("src"); });
  }

  function openLightbox(src) {
    visibleSrcs = currentVisibleSrcs();
    currentIndex = visibleSrcs.indexOf(src);
    if (currentIndex < 0) currentIndex = 0;
    lightboxImg.src = visibleSrcs[currentIndex];
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function showDelta(delta) {
    if (!visibleSrcs.length) return;
    currentIndex = (currentIndex + delta + visibleSrcs.length) % visibleSrcs.length;
    lightboxImg.src = visibleSrcs[currentIndex];
  }

  figures.forEach(function (f) {
    f.addEventListener("click", function () {
      openLightbox(f.querySelector("img").getAttribute("src"));
    });
  });

  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", function () { showDelta(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { showDelta(1); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showDelta(-1);
    if (e.key === "ArrowRight") showDelta(1);
  });

  applyFilter("all");
}

document.addEventListener("DOMContentLoaded", initGallery);
