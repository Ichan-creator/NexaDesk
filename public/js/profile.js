document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("passwordForm");

  if (!passwordForm) return;

  passwordForm.addEventListener("submit", (event) => {
    const newPassword =
      passwordForm.querySelector('[name="new_password"]');

    const confirmPassword =
      passwordForm.querySelector('[name="confirm_password"]');

    if (!newPassword || !confirmPassword) return;

    if (newPassword.value.length < 8) {
      event.preventDefault();

      alert("New password must be at least 8 characters.");
      newPassword.focus();

      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      event.preventDefault();

      alert("Passwords do not match.");
      confirmPassword.focus();
    }
  });
});