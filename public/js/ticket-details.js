document.addEventListener("DOMContentLoaded", () => {
  const replyForm = document.getElementById("replyForm");
  const replyMessage = document.getElementById("replyMessage");
  const replyCounter = document.getElementById("replyCounter");

  if (replyMessage && replyCounter) {
    replyMessage.addEventListener("input", () => {
      replyCounter.textContent =
        `${replyMessage.value.length} characters`;
    });
  }

  if (replyForm) {
    replyForm.addEventListener("submit", (event) => {
      if (!replyMessage) return;

      if (replyMessage.value.trim().length < 3) {
        event.preventDefault();

        alert("Please enter a message before submitting.");
        replyMessage.focus();
      }
    });
  }
});