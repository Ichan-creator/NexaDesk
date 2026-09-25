document.addEventListener("DOMContentLoaded", () => {

  const menu = document.getElementById("mobileMenu");
  const sidebar = document.getElementById("sidebar");

  if (menu && sidebar) {

    menu.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

  }


  const search = document.getElementById("globalSearch");

  if (search) {

    search.addEventListener("keydown", (event) => {

      if (event.key === "Enter") {

        const value = search.value.trim();

        if (value) {
          window.location.href =
            `/tickets?search=${encodeURIComponent(value)}`;
        }

      }

    });

  }


  setTimeout(() => {

    document.querySelectorAll(".alert").forEach((alert) => {

      alert.style.transition = "opacity 0.3s ease";
      alert.style.opacity = "0";

      setTimeout(() => {
        alert.remove();
      }, 300);

    });

  }, 5000);

});