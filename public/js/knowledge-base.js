document.addEventListener("DOMContentLoaded", () => {

  const searchInput =
    document.getElementById("knowledgeSearch");

  const clearSearch =
    document.getElementById("clearSearch");

  const articles =
    Array.from(
      document.querySelectorAll(".article-card")
    );

  const categoryButtons =
    Array.from(
      document.querySelectorAll(
        ".category-card, .all-articles-btn"
      )
    );

  const articleSectionTitle =
    document.getElementById(
      "articleSectionTitle"
    );

  const articleResultText =
    document.getElementById(
      "articleResultText"
    );

  const noArticles =
    document.getElementById("noArticles");

  const resetButton =
    document.getElementById(
      "resetKnowledgeBase"
    );


  let selectedCategory = "all";


  /*
  ========================================
  ARTICLE CONTENT
  ========================================
  */

  const articleContent = {

    "Computer Won't Turn On": `
      <h3>Check the Power Source</h3>

      <ol>
        <li>Make sure the power cable is securely connected.</li>
        <li>If you are using a laptop, connect the charger and check if the charging indicator appears.</li>
        <li>If you are using a desktop computer, check the power strip or wall outlet.</li>
      </ol>

      <h3>Perform a Basic Power Reset</h3>

      <ol>
        <li>Turn off the computer.</li>
        <li>Disconnect the power cable or charger.</li>
        <li>For laptops with a removable battery, remove the battery if possible.</li>
        <li>Hold the power button for approximately 10 to 15 seconds.</li>
        <li>Reconnect the power source and try turning the computer on again.</li>
      </ol>

      <h3>If the Problem Continues</h3>

      <p>
        If the computer still does not turn on, create a support ticket
        and provide the device name, model, and any visible lights or
        error messages.
      </p>
    `,


    "Printer Troubleshooting": `
      <h3>Check the Printer</h3>

      <ol>
        <li>Make sure the printer is powered on.</li>
        <li>Check that the printer is connected to the correct network or computer.</li>
        <li>Check the printer display for error messages.</li>
        <li>Make sure there is enough paper.</li>
        <li>Check for paper jams.</li>
      </ol>

      <h3>Check the Print Queue</h3>

      <ol>
        <li>Open your computer's printer settings.</li>
        <li>Select the affected printer.</li>
        <li>Open the print queue.</li>
        <li>Cancel any stuck print jobs.</li>
        <li>Try printing again.</li>
      </ol>

      <h3>If the Printer Remains Offline</h3>

      <p>
        Restart the printer and verify its network connection.
        If the problem continues, submit a ticket to the Service Desk.
      </p>
    `,


    "Application Not Responding": `
      <h3>Wait for the Application</h3>

      <p>
        Some applications may temporarily stop responding while processing
        a large task. Wait for a short period before forcing the application
        to close.
      </p>

      <h3>Close the Application</h3>

      <ol>
        <li>Try closing the application normally.</li>
        <li>If it does not respond, open Task Manager.</li>
        <li>Find the affected application.</li>
        <li>Select the application and choose End Task.</li>
        <li>Open the application again.</li>
      </ol>

      <h3>If the Problem Happens Repeatedly</h3>

      <p>
        Record the application name, version, and any error message.
        Submit this information in a support ticket.
      </p>
    `,


    "Windows Update Troubleshooting": `
      <h3>Restart the Computer</h3>

      <p>
        Restart the computer and check Windows Update again.
      </p>

      <h3>Check Your Internet Connection</h3>

      <p>
        Make sure the computer has a stable internet connection before
        starting an update.
      </p>

      <h3>Check for Updates</h3>

      <ol>
        <li>Open Windows Settings.</li>
        <li>Select Windows Update.</li>
        <li>Select Check for updates.</li>
        <li>Allow available updates to download and install.</li>
      </ol>

      <h3>If the Update Fails</h3>

      <p>
        Take note of the update error code and submit a support ticket
        if the problem continues.
      </p>
    `,


    "No Internet Connection": `
      <h3>Check the Network Connection</h3>

      <ol>
        <li>Check whether Wi-Fi is enabled.</li>
        <li>If using Ethernet, make sure the network cable is connected properly.</li>
        <li>Check whether other devices can access the internet.</li>
      </ol>

      <h3>Reconnect to the Network</h3>

      <ol>
        <li>Disconnect from the current Wi-Fi network.</li>
        <li>Wait a few seconds.</li>
        <li>Reconnect using the correct network credentials.</li>
      </ol>

      <h3>Restart Network Equipment</h3>

      <p>
        If appropriate for your environment, restart the network equipment
        and wait for the connection to become available again.
      </p>

      <h3>If the Issue Continues</h3>

      <p>
        Submit a support ticket and include your location, device,
        connection type, and any error message shown.
      </p>
    `,


    "Wi-Fi Connection Troubleshooting": `
      <h3>Check Wi-Fi</h3>

      <ol>
        <li>Make sure Wi-Fi is enabled.</li>
        <li>Check that Airplane Mode is disabled.</li>
        <li>Verify that you are connected to the correct wireless network.</li>
      </ol>

      <h3>Reconnect</h3>

      <ol>
        <li>Disconnect from the Wi-Fi network.</li>
        <li>Reconnect to the network.</li>
        <li>Enter the correct password if requested.</li>
      </ol>

      <h3>Check Signal Strength</h3>

      <p>
        Move closer to the wireless access point if the signal is weak.
      </p>

      <h3>Still Having Problems?</h3>

      <p>
        Submit a ticket with your device name, location, network name,
        and description of the connection problem.
      </p>
    `,


    "Email Not Sending": `
      <h3>Check Your Internet Connection</h3>

      <p>
        Verify that your computer has an active network connection.
      </p>

      <h3>Check the Outbox</h3>

      <ol>
        <li>Open your email application.</li>
        <li>Check the Outbox folder.</li>
        <li>Look for messages that are stuck or showing an error.</li>
      </ol>

      <h3>Check Attachments</h3>

      <p>
        Large or restricted attachments may prevent an email from being
        sent. Remove the attachment or follow your organization's
        file-sharing procedures.
      </p>

      <h3>If the Issue Continues</h3>

      <p>
        Submit a support ticket with the recipient, error message,
        and approximate time the problem occurred.
      </p>
    `,


    "How to Identify Phishing Emails": `
      <h3>Common Warning Signs</h3>

      <ul>
        <li>Unexpected requests for passwords or sensitive information.</li>
        <li>Urgent or threatening messages asking you to act immediately.</li>
        <li>Links leading to unfamiliar websites.</li>
        <li>Unexpected attachments.</li>
        <li>Messages from addresses that do not match the expected sender.</li>
      </ul>

      <h3>Do Not Click Suspicious Links</h3>

      <p>
        Do not open suspicious links or attachments. If you are unsure
        whether a message is legitimate, verify the sender through
        an appropriate trusted channel.
      </p>

      <h3>Report Suspicious Messages</h3>

      <p>
        Follow your organization's security reporting procedure or
        create a support ticket so the Service Desk can review the message.
      </p>
    `,


    "Password Reset": `
      <h3>Before Resetting Your Password</h3>

      <p>
        Make sure you are using the correct username and verify that
        Caps Lock is not accidentally enabled.
      </p>

      <h3>Reset Your Password</h3>

      <ol>
        <li>Open the organization's approved password reset page.</li>
        <li>Enter your username or account information.</li>
        <li>Complete the required verification steps.</li>
        <li>Create a new password according to the organization's password policy.</li>
        <li>Sign in again using the new password.</li>
      </ol>

      <h3>If You Cannot Reset It</h3>

      <p>
        Create a support ticket or contact the Service Desk for assistance.
      </p>
    `,


    "Account Locked": `
      <h3>Why Accounts Become Locked</h3>

      <p>
        An account may become locked after multiple unsuccessful
        login attempts or other security controls.
      </p>

      <h3>What You Should Do</h3>

      <ol>
        <li>Stop entering passwords repeatedly.</li>
        <li>Verify that you are using the correct username.</li>
        <li>Check whether another device or application may still be using an old password.</li>
        <li>Contact the Service Desk or submit a ticket for account assistance.</li>
      </ol>

      <h3>Security Reminder</h3>

      <p>
        Never share your password with another person, including
        someone claiming to provide technical support.
      </p>
    `

  };


  /*
  ========================================
  CATEGORY COUNTS
  ========================================
  */

  const categoryCounts = {};

  articles.forEach(article => {

    const category =
      article.dataset.category;

    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;

  });


  document
    .querySelectorAll(".category-count")
    .forEach(counter => {

      const category =
        counter.dataset.count;

      counter.textContent =
        categoryCounts[category] || 0;

    });


  /*
  ========================================
  FILTER ARTICLES
  ========================================
  */

  function filterArticles() {

    const searchTerm =
      searchInput
        ? searchInput.value
            .toLowerCase()
            .trim()
        : "";

    let visibleCount = 0;


    articles.forEach(article => {

      const category =
        article.dataset.category
          .toLowerCase();

      const title =
        article.dataset.title
          .toLowerCase();

      const keywords =
        article.dataset.keywords
          .toLowerCase();

      const content =
        article.dataset.content
          .toLowerCase();


      const matchesCategory =
        selectedCategory === "all" ||
        category ===
          selectedCategory.toLowerCase();


      const searchableText =
        `${category} ${title} ${keywords} ${content}`;


      const matchesSearch =
        !searchTerm ||
        searchableText.includes(searchTerm);


      const shouldShow =
        matchesCategory &&
        matchesSearch;


      article.style.display =
        shouldShow ? "" : "none";


      if (shouldShow) {
        visibleCount++;
      }

    });


    /*
    ===============================
    SECTION TITLE
    ===============================
    */

    if (selectedCategory === "all") {

      articleSectionTitle.textContent =
        "All Knowledge Base Articles";

    } else {

      articleSectionTitle.textContent =
        `${selectedCategory} Articles`;

    }


    /*
    ===============================
    RESULT TEXT
    ===============================
    */

    if (searchTerm) {

      articleResultText.textContent =
        `${visibleCount} article${visibleCount !== 1 ? "s" : ""} found for "${searchInput.value}"`;

    } else {

      articleResultText.textContent =
        `${visibleCount} article${visibleCount !== 1 ? "s" : ""} available`;

    }


    /*
    ===============================
    EMPTY STATE
    ===============================
    */

    if (visibleCount === 0) {

      noArticles.style.display =
        "block";

    } else {

      noArticles.style.display =
        "none";

    }

  }


  /*
  ========================================
  CATEGORY BUTTONS
  ========================================
  */

  categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

      selectedCategory =
        button.dataset.category;

      categoryButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      filterArticles();

      const articlesSection =
        document.querySelector(
          ".article-header"
        );

      if (articlesSection) {

        articlesSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /*
  ========================================
  SEARCH
  ========================================
  */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      () => {

        filterArticles();

      }
    );

  }


  /*
  ========================================
  CLEAR SEARCH
  ========================================
  */

  if (clearSearch) {

    clearSearch.addEventListener(
      "click",
      () => {

        if (searchInput) {
          searchInput.value = "";
          searchInput.focus();
        }

        filterArticles();

      }
    );

  }


  /*
  ========================================
  RESET
  ========================================
  */

  if (resetButton) {

    resetButton.addEventListener(
      "click",
      () => {

        selectedCategory = "all";

        categoryButtons.forEach(button => {
          button.classList.remove("active");
        });

        const allButton =
          document.querySelector(
            '.all-articles-btn[data-category="all"]'
          );

        if (allButton) {
          allButton.classList.add("active");
        }

        if (searchInput) {
          searchInput.value = "";
        }

        filterArticles();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /*
  ========================================
  ARTICLE MODAL
  ========================================
  */

  const modal =
    document.getElementById(
      "articleModal"
    );

  const modalTitle =
    document.getElementById(
      "modalTitle"
    );

  const modalCategory =
    document.getElementById(
      "modalCategory"
    );

  const modalContent =
    document.getElementById(
      "modalContent"
    );

  const closeModalButton =
    document.getElementById(
      "closeArticleModal"
    );

  const modalOverlay =
    document.getElementById(
      "articleModalOverlay"
    );


  function openArticle(article) {

    const title =
      article.dataset.title;

    const category =
      article.dataset.category;


    modalTitle.textContent =
      title;

    modalCategory.textContent =
      category;


    if (articleContent[title]) {

      modalContent.innerHTML =
        articleContent[title];

    } else {

      modalContent.innerHTML = `
        <p>
          This article does not have detailed instructions yet.
        </p>
      `;

    }


    modal.classList.add("show");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

  }


  function closeArticle() {

    modal.classList.remove("show");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  /*
  ========================================
  CLICK ARTICLE
  ========================================
  */

  articles.forEach(article => {

    article.addEventListener(
      "click",
      () => {

        openArticle(article);

      }
    );

  });


  /*
  ========================================
  CLOSE MODAL
  ========================================
  */

  if (closeModalButton) {

    closeModalButton.addEventListener(
      "click",
      closeArticle
    );

  }


  if (modalOverlay) {

    modalOverlay.addEventListener(
      "click",
      closeArticle
    );

  }


  /*
  ========================================
  ESC KEY
  ========================================
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal.classList.contains("show")
      ) {

        closeArticle();

      }

    }
  );


  /*
  ========================================
  INITIAL LOAD
  ========================================
  */

  filterArticles();

});