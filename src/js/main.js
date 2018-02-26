// DOM is ready
$(document).ready(function () {
    let moreLink = document.createElement("a");
    let lessLink = document.createElement("a");
    let allParagraphs = document.getElementsByTagName("p");
    let firstParagraph = allParagraphs[0];

    moreLink.setAttribute("href", "#");
    moreLink.setAttribute("class", "more-link");
    moreLink.innerHTML = "Read more";

    firstParagraph.appendChild(moreLink);

    for (let p of allParagraphs) {
        if (p != allParagraphs[0]) {
            p.style.display = "none";
        }
    }


    // ============ Routine to reveal hidden paragraphs ======== //

    $(".more-link").on("click", function () {
        let lastParagraph = allParagraphs[allParagraphs.length - 1];
        moreLink.style.display = "none";

        for (let p of allParagraphs) {
            if (p != allParagraphs[0]) {
                p.style.display = "block";
            }
        }

        lessLink.setAttribute("href", "#");
        lessLink.setAttribute("class", "less-link");
        lessLink.innerHTML = "Less";
        lastParagraph.appendChild(lessLink);

        if (lessLink.style.display === 'none') {
            lessLink.style.display = "inline-block";
        }

    });


    // ====== Routine to hide paragraphs ============= //
    // note: we had to handle this with event delegation ==== //

    $("p").on("click", ".less-link", function () {
        console.log("Clicked less-link button");
        lessLink.style.display = "none";

        for (let p of allParagraphs) {
            if (p != allParagraphs[0]) {
                p.style.display = "none";
            }
        }

        moreLink.style.display = "inline-block";
    });


}); // end dom ready