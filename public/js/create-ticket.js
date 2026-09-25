document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createTicketForm");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    const subject = form.querySelector('[name="subject"]');
    const description = form.querySelector('[name="description"]');

    if (!subject || !description) return;

    if (subject.value.trim().length < 5) {
      event.preventDefault();

      alert("Please enter a more descriptive ticket subject.");
      subject.focus();

      return;
    }

    if (description.value.trim().length < 10) {
      event.preventDefault();

      alert("Please provide more details about the issue.");
      description.focus();

      return;
    }
  });

  // Character counter
  const description = form.querySelector('[name="description"]');
  const counter = document.getElementById("descriptionCounter");

  if (description && counter) {
    description.addEventListener("input", () => {
      counter.textContent =
        `${description.value.length} characters`;
    });
  }
});