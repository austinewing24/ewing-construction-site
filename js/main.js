// Ewing Construction: shared site behavior (no dependencies)

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Contact form: "I'm not sure yet" disables the month/year timeline selects
  document.querySelectorAll(".not-sure-check input[type=checkbox]").forEach(function (cb) {
    cb.addEventListener("change", function () {
      var row = cb.closest(".form-row").querySelector(".timeline-row");
      if (!row) return;
      row.querySelectorAll("select").forEach(function (s) { s.disabled = cb.checked; });
    });
  });

  // Current year in footer
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
