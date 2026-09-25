document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll("tbody tr")
        .forEach(row => {

            row.addEventListener(
                "mouseenter",
                () => {
                    row.style.cursor = "pointer";
                }
            );

        });

});