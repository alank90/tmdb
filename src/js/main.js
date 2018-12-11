// =========  /src/js/main.js ============================ //

// ========== Module Dependencies ================= //
const tmdbQuery = require("./helper-functions/tmdbQuery");

$(document).ready(function() {
  // =====  Declare Method Variables ============= //
  var $oForm = $("form");
  var $oContainer = $("#container");
  var $oPoster = $("#poster");
  var $oClear = $("#clear");
  var $oError = $(".error_message");

  // ===== End Variable Declarations =========== //

  $oContainer.addClass("hidden");
  $oClear.addClass("hidden");
  $oError.addClass("hidden");

  // ===================================================================== //
  // ============ TMDB Query EventHandler ================================ //
  // ===================================================================== //
  $oForm.on("submit", function(e) {
    e.preventDefault();
    $("#poster").html(
      '<center><img src="./src/img/loading.gif" alt="loading..."></center>'
    ); //gif while poster loads.

    /* jshint ignore:start */
    let displayMoviePage = async function() {
      let oMovieInfo = await tmdbQuery();

      // Now we can begin output of oMovieInfo to the page
      // First Lets check state of the Movie Info .container
      if ($oError.not(".hidden")) {
        $oError.addClass("hidden");
      }

      // ========= Let's retrieve the Movie poster image ============= //
      let sMoviePoster =
        "https://image.tmdb.org/t/p/w342/" + oMovieInfo.poster_path;
      $("#poster").html(
        "<img src='" + sMoviePoster + "' alt='No Poster Available'>"
      );
      if ($("#poster").hasClass("hidden")) {
        $("#poster").removeClass("hidden");
      }
      // ========== end retrieve Movie Poster Image ================ //

      // Let's fill in the page with oMovieInfo object retrieved from TMDB
      $oContainer
        .find(".title")
        .html("<p class='title'>Movie Title:</p>" + oMovieInfo.title);
      $oContainer
        .find(".tagline")
        .html("<p class='tagline'></p>" + oMovieInfo.tagline);
      $oContainer
        .find(".plot")
        .html("<p class='plot'>Movie Overview</p>" + oMovieInfo.overview);
      $oContainer
        .find(".release_date")
        .html(
          "<p class='release_date'>Release Date:</p>" + oMovieInfo.release_date
        );
      oMovieInfo.revenue = oMovieInfo.revenue
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //Convert to Dollars
      $oContainer
        .find(".revenue")
        .html(
          "<p class='revenue'>Movie Revenues:</p>" + "$" + oMovieInfo.revenue
        );
      $oContainer
        .find(".runtime")
        .html(
          "<p class='runtime'>Runtime:</p>" + oMovieInfo.runtime + " Minutes"
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
    };
    /* jshint ignore:end */
    // =========================================================================== //
    // ============== End of displayMoviePage function =========================== //
    // =========================================================================== //

    displayMoviePage();

    // ===================================================================== //
    // ============ End TMDB Query EventHandler ============================ //
    // ===================================================================== //
  });

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
