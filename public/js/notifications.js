document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("notificationSearch");

    const clearButton =
        document.getElementById("clearNotificationSearch");

    const notificationList =
        document.getElementById("notificationList");

    const noResults =
        document.getElementById("noNotificationResults");

    if (!searchInput || !notificationList) {
        return;
    }

    const notifications =
        notificationList.querySelectorAll(
            ".notification-item"
        );

    function filterNotifications() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleCount = 0;

        notifications.forEach(notification => {

            const text =
                notification.dataset.search || "";

            const matches =
                text.includes(search);

            notification.style.display =
                matches ? "" : "flex";

            if (matches) {
                visibleCount++;
            }

        });

        if (noResults) {
            noResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";
        }

        notificationList.style.display =
            visibleCount === 0
                ? "none"
                : "flex";
    }

    searchInput.addEventListener(
        "input",
        filterNotifications
    );

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                filterNotifications();

                searchInput.focus();
            }
        );

    }

});