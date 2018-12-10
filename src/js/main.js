/* =========================================================================
=== === === === === Main JavaScript File === === === = === === === === ===
=== === === === === === === === === === === === === === === === ====== === */

$(document).ready(function() {
  // =====  Declare Method Variables ============= //
  var $oForm = $("form");
  var $oContainer = $("#container");
  var $oPoster = $("#poster");
  var $oClear = $("#clear");
  var $oError = $(".error_message");
  // ===== End Variable Declarations ====== //

  $oContainer.addClass("hidden");
  $oClear.addClass("hidden");
  $oError.addClass("hidden");

  // ========================================================================= //
  // ============ TMDb Query EventHandler =================================== //
  // ======================================================================== //
  $oForm.on("submit", function(e) {
    e.preventDefault();
    $("#poster").html(
      '<center><img src="./src/img/loading.gif" alt="loading..."></center>'
    ); //gif while poster loads.

    displayMoviePage();

    // ====================================================== //
    // ======= Let's Get Movie Info w/async/await =========== //
    // ====================================================== //
    /* jshint ignore:start */
    async function tmdbQuery() {
      //  Begin the two AJAX calls needed to first retrieve Movie ID
      //  and then retrieve Movie Info
      var sUrl,
        oData,
        iTmdbId = 0;
      let sTmdbQuery = $("form").serialize();
      let api_key = "5888233c985dfa60ed6be20d8e6726a1";

      // Query string to retrieve TMDB movie id
      let sQueryMovieIdUrl =
        "https://api.themoviedb.org/3/search/movie?api_key=5888233c985dfa60ed6be20d8e6726a1&" +
        sTmdbQuery;

      // Ajax Query settings for movie id
      let settingsAjax1 = {
        async: true,
        crossDomain: true,
        url: sQueryMovieIdUrl,
        method: "GET",
        headers: {},
        data: "{}"
      };

      // get the movie id first from TMDB database
      let idResponse = await $.ajax(settingsAjax1);

      // Check if any results returned
      if (idResponse.total_results > 0) {
        iTmdbId = idResponse.results[0].id;

        //Query string to retrieve Movie Info
        let sQueryMovieInfoUrl =
          "https://api.themoviedb.org/3/movie/" +
          iTmdbId +
          "?api_key=" +
          api_key;

        let settingsAjax2 = {
          async: true,
          crossDomain: true,
          url: sQueryMovieInfoUrl,
          method: "GET",
          headers: {},
          data: "{}"
        };

        // Get movie info via the movie id with second AJAX call to the TMDB database
        let movieInfo = await $.ajax(settingsAjax2);

        return movieInfo;
      } else {
        $oContainer.addClass("hidden");
        $oError.removeClass("hidden");
        $oError.html(
          "<p class='title'>No Movie Found. Try Alternate Spelling or check the Release Date if you entered one...</p>"
        );
      } // end if/else
    }
    /* jshint ignore:end */
    // =========================================================== //
    // ========= end tmdbQuery function ========================== //
    // =========================================================== //

    // =========================================================================== //
    // ============== displayMoviePage function ================================== //
    // =========================================================================== //

    /* jshint ignore:start */
    async function displayMoviePage() {
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
    }
    /* jshint ignore:end */
    // =========================================================================== //
    // ============== End of displayMoviePage function =========================== //
    // =========================================================================== //
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
