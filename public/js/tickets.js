document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("ticketSearch");
  const rows = document.querySelectorAll(".ticket-row-searchable");

  // Client-side search
  if (searchInput && rows.length) {
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase().trim();

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();

        row.style.display =
          text.includes(searchValue) ? "" : "none";
      });
    });
  }

  // Automatically submit filters
  const statusFilter = document.getElementById("statusFilter");
  const priorityFilter = document.getElementById("priorityFilter");

  if (statusFilter) {
    statusFilter.addEventListener("change", () => {
      statusFilter.form.submit();
    });
  }

  if (priorityFilter) {
    priorityFilter.addEventListener("change", () => {
      priorityFilter.form.submit();
    });
  }

  // Clear filters
  const clearFilters = document.getElementById("clearFilters");

  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      window.location.href = "/tickets";
    });
  }
});