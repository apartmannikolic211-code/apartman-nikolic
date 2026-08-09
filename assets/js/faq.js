/* Apartman Nikolić — FAQ accordion */

function initFaq() {
  document.querySelectorAll(".faq-item__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-item__a");
      const isOpen = item.classList.contains("is-open");
      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initFaq);

document.addEventListener("i18n:changed", function () {
  document.querySelectorAll(".faq-item.is-open .faq-item__a").forEach(function (answer) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  });
});
