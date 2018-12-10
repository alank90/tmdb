/* =========================================================================
=== === === === === Main JavaScript File === === === = === === === === ===
=== === === === === === === === === === === === === === === === ====== === */

$(document).ready(function() {
    // =====  Declare Variables =============
    var $oForm = $("form");
    var $oContainer = $("#container");
    var $oPoster = $("#poster");
    var $oClear = $("#clear");
    var $oError = $(".error_message");
    /*End Variable Declarations*/
    $oContainer.addClass("hidden");
    $oClear.addClass("hidden");
    $oError.addClass("hidden");

    // ============ TMDb Query EventHandler ======================
    $oForm.on("submit", function(e) {
        e.preventDefault();
        $("#poster").html(
            '<center><img src="img/loading.gif" alt="loading..."></center>'
        ); //gif while poster loads.
        //  Begin the two AJAX calls needed to first retrieve Movie ID and then retrieve Movie Info
        var sUrl,
            oData,
            iTmdbId = 0;
        var sTmdbQuery = $("form").serialize();
        var api_key = "5888233c985dfa60ed6be20d8e6726a1";
        var sQueryMovieIdUrl =
            "https://api.themoviedb.org/3/search/movie?api_key=5888233c985dfa60ed6be20d8e6726a1&" +
            sTmdbQuery; // Query string to retrieve movie id
        var settingsAjax1 = {
            async: true,
            crossDomain: true,
            url: sQueryMovieIdUrl,
            method: "GET",
            headers: {},
            data: "{}"
        };
        // End Variable Declarations
        $.ajax(settingsAjax1).done(function(idResponse) {
            if (idResponse.total_results > 0) {
                //Check if any results from search
                iTmdbId = idResponse.results[0].id;
                var sQueryMovieInfoUrl =
                    "https://api.themoviedb.org/3/movie/" +
                    iTmdbId +
                    "?api_key=" +
                    api_key; //Query string to retrieve Movie Info
                var settingsAjax2 = {
                    async: true,
                    crossDomain: true,
                    url: sQueryMovieInfoUrl,
                    method: "GET",
                    headers: {},
                    data: "{}"
                };
                $.ajax(settingsAjax2) // Second AJAX call for the actual Movie info we want
                    .done(function(oInfo) {
                        oMovieInfo = oInfo;
                        oDfdOutput.resolve(); // This resolves the oDfdOutput promise.
                    }); //end 2nd .done for Ajax2
            } else {
                $oContainer.addClass("hidden");
                $oError.removeClass("hidden");
                $oError.html(
                    "<p class='title'>No Movie Found. Try Alternate Spelling or check the Release Date if you entered one...</p>"
                );
            }
        }); // end first .done for AJAX1

        // =========== Create a deferred object to delay using oMovieInfo object ======
        // =========== until it has been created in the AJAX2 function ==================
        var oDfdOutput = $.Deferred();
        oDfdOutput.done(function() {
            // Now we can begin output of oMovieInfo to the page
            // in this function...
            // First Lets check state of the Movie Info .container
            if ($oError.not(".hidden")) {
                $oError.addClass("hidden");
            }

            // =================== Let's retrieve the Movie poster image ===========================
            var sMoviePoster =
                "https://image.tmdb.org/t/p/w342/" + oMovieInfo.poster_path;
            $("#poster").html(
                "<img src='" + sMoviePoster + "' alt='No Poster Available'>"
            );
            if ($("#poster").hasClass("hidden")) {
                $("#poster").removeClass("hidden");
            }
            // =====================================================================================
            // Let's fill in the page with oMovieInfo object retrieved from TMDb
            $oContainer
                .find(".title")
                .html("<p class='title'>Movie Title:</p>" + oMovieInfo.title);
            $oContainer
                .find(".tagline")
                .html("<p class='tagline'></p>" + oMovieInfo.tagline);
            $oContainer
                .find(".plot")
                .html(
                    "<p class='plot'>Movie Overview</p>" + oMovieInfo.overview
                );
            $oContainer
                .find(".release_date")
                .html(
                    "<p class='release_date'>Release Date:</p>" +
                        oMovieInfo.release_date
                );
            oMovieInfo.revenue = oMovieInfo.revenue
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //Convert to Dollars
            $oContainer
                .find(".revenue")
                .html(
                    "<p class='revenue'>Movie Revenues:</p>" +
                        "$" +
                        oMovieInfo.revenue
                );
            $oContainer
                .find(".runtime")
                .html(
                    "<p class='runtime'>Runtime:</p>" +
                        oMovieInfo.runtime +
                        " Minutes"
                );
            // Check if there is a Movie Page URL
            if (oMovieInfo.homepage) {
                $oContainer.find(".movie_url").attr({
                    href: oMovieInfo.homepage,
                    target: "_blank"
                });
            } else {
                $oContainer
                    .find("p .movie_url ")
                    .text("Movie Page Not Available")
                    .attr("href", "");
            }
            $oContainer.removeClass("hidden"); // Make Results Container Visible
            $oClear.removeClass("hidden"); // Show the clear button
        });
    }); //End Movie Query event handler

    // Reset Form Function ==================================================
    function resetForm($form) {
        $oForm.find("input").val("");
    }

    // =========== Clear button event handler =====================================
    $("#clear").on("click", function(e) {
        e.preventDefault();
        $oContainer.addClass("hidden");
        $oPoster.addClass("hidden");
        $oClear.addClass("hidden");
        resetForm($("form[name=searchForm]")); // by name
    }); // End #clear button event handler
}); // End document.ready
