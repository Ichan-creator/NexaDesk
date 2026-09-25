document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("adminSearch");
  const rows = document.querySelectorAll(".admin-searchable");

  if (searchInput && rows.length) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase().trim();

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();

        row.style.display =
          text.includes(value) ? "" : "none";
      });
    });
  }

  // Confirm administrative actions
  document.querySelectorAll("[data-confirm]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const message =
        button.getAttribute("data-confirm");

      if (message && !confirm(message)) {
        event.preventDefault();
      }
    });
  });
});