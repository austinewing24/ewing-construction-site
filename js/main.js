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

  // Contact form: project-type tabs show/hide their qualifying questions
  var typeTabs = document.querySelector(".type-tabs");
  if (typeTabs) {
    var tabs = typeTabs.querySelectorAll(".type-tab");
    var groups = document.querySelectorAll("[data-type-group]");
    var projectTypeField = document.getElementById("project_type_value");
    typeTabs.addEventListener("click", function (e) {
      var tab = e.target.closest(".type-tab");
      if (!tab) return;
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-pressed", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed", "true");
      var type = tab.getAttribute("data-type");
      if (projectTypeField) projectTypeField.value = tab.textContent.trim();
      groups.forEach(function (g) {
        g.hidden = g.getAttribute("data-type-group") !== type;
      });
    });
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
