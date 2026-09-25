document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // PASSWORD TOGGLE
  // ========================================

  const passwordToggle =
    document.querySelector(".password-toggle");

  const password =
    document.getElementById("password");


  if (passwordToggle && password) {

    passwordToggle.addEventListener("click", () => {

      const icon =
        passwordToggle.querySelector("i");


      if (password.type === "password") {

        password.type = "text";

        if (icon) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }

      } else {

        password.type = "password";

        if (icon) {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }

      }

    });

  }


  // ========================================
  // REGISTER PASSWORD CONFIRMATION
  // ========================================

  const registerForm =
    document.querySelector("#registerForm");


  if (registerForm) {

    registerForm.addEventListener(
      "submit",
      (event) => {

        const passwordInput =
          registerForm.querySelector(
            '[name="password"]'
          );

        const confirmInput =
          registerForm.querySelector(
            '[name="confirm_password"]'
          );


        if (
          passwordInput &&
          confirmInput &&
          passwordInput.value !== confirmInput.value
        ) {

          event.preventDefault();

          alert("Passwords do not match.");

        }

      }
    );

  }

});