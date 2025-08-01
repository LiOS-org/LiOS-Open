// Initialize LiOS-Open window system
(function () {
  function closeLiOSWindow(windowEl) {
    if (windowEl) {
      // Optional: remove an "active" class if you're using it
      windowEl.classList.remove("active");

      // Hide the element manually (for when :target is removed)
      windowEl.style.display = "none";

      // Remove the hash from the URL to deactivate :target
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }

  // 1. Close button logic
  document.addEventListener("click", function (e) {
    const closeBtn = e.target.closest("[data-lios-window-close]");
    if (closeBtn) {
      const win = closeBtn.closest(".lios-window-container");
      closeLiOSWindow(win);
      e.preventDefault();
    }
  });

  // 2. hashchange — restore display when :target is used again
  window.addEventListener("hashchange", function () {
    const id = location.hash.slice(1); // get the ID from hash
    const win = document.getElementById(id);
    if (win && win.classList.contains("lios-window")) {
      // Reset display if opening again
      win.style.display = "block";
    }
  });

  // 3. On initial load: if there's a :target, show it
  window.addEventListener("load", function () {
    const id = location.hash.slice(1);
    const win = document.getElementById(id);
    if (win && win.classList.contains("lios-window")) {
      win.style.display = "block";
    }
  });
})();