// =========  /src/js/main.js ============================ //

// ========== Module Dependencies ================= //
const getMovieInfo = require("./helper-functions/getMovieInfo");
const getPersonInfo = require("./helper-functions/getPersonInfo");

$(document).ready(function() {
  // =====  Declare Method Variables ============= //
  var $oForm = $("form");
  var $oContainer = $("#container");
  var oMovieInfo = {};
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
    // ==== Call TMDB API and get movie info ============== //
    let displayMoviePage = async function() {
      oMovieInfo = await getMovieInfo();

      // Now we can paint the page w/oMovieInfo object
      // First Lets check state of the Movie Info .container
      if ($oError.not(".hidden")) {
        $oError.addClass("hidden");
      }
      // Also empty Dom node p.cast and p.crew if present from a previous query
      if ($(".character") || $(".crew")) {
        $(".character").remove();
        $(".crew").remove();
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

      // Movie Overview
      $oContainer
        .find(".title")
        .html("<p class='title'>Movie Title:</p>" + oMovieInfo.title);
      $oContainer
        .find(".tagline")
        .html("<p class='tagline'></p>" + oMovieInfo.tagline);
      $oContainer
        .find(".plot")
        .html("<p class='plot'>Movie Overview</p>" + oMovieInfo.overview);

      // Cast Listing
      let aCastOfCharacters = oMovieInfo.credits.cast;
      // filter first 8 cast entries
      aCastOfCharacters = aCastOfCharacters.filter((el, index) => {
        return index <= 9;
      });
      console.log(aCastOfCharacters);

      // Crew listing
      let aCrew = oMovieInfo.credits.crew;

      aCrew = aCrew.filter(el => {
        return (
          (el.department === "Directing" && el.job === "Director") ||
          (el.department === "Writing" && el.job === "Screenplay") ||
          (el.department === "Writing" && el.job === "Writer")
        );
      });
      console.log(aCrew);

      // Then print out
      aCastOfCharacters.forEach((el, index) => {
        $oContainer
          .find(".cast")
          .append(
            "<li class='character'> <span>" +
              el.character +
              "</span><span class='actor' data-character-index=" +
              index +
              ">" +
              el.name +
              "</span> </li>"
          );
      });

      aCrew.forEach((el, index) => {
        if ($(".crew:last > span:first").text() === el.job) {
          $oContainer
            .find(".production .crew:last")
            .append(
              "<span class='director-writer' data-crew-index=" +
                index +
                ">" +
                el.name +
                "</span>"
            );
        } else {
          $oContainer
            .find(".production")
            .append(
              "<li class='crew'><span>" +
                el.job +
                "</span><span class='director-writer' data-crew-index=" +
                index +
                ">" +
                el.name +
                "</span>"
            );
        }
      });

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

  // ================================================================== //
  // ============ Event Handler for Getting Person Info ================ //
  // ================================================================== //

  /* jshint ignore:start */
  // Had to use event delegation here
  $(".cast, .production").on(
    "click",
    ".actor, .director-writer",
    async function(event) {
      try {
        const el = event.target;
        console.log(el);

        if ($(el).hasClass("actor")) {
          var iPersonId =
            oMovieInfo.credits.cast[$(el).data("character-index")].id;
        } else if ($(el).hasClass("director-writer")) {
          var iPersonId = oMovieInfo.credits.crew[$(el).data("crew-index")].id;
        } else {
          console.log("Error with Personid");
        }

        console.log(`iPersonId is ${iPersonId}`);

        let oPersonInfo = await getPersonInfo(iPersonId);

        let $oBiography = $(el).children(".bio");

        // Check if p.bio is in the DOM or not
        if ($oBiography.length === 0) {
          // need to add p.bio to DOM
          $(el).append(
            "<p class='bio'>" +
              oPersonInfo.biography +
              "<br>" +
              "Born: " +
              oPersonInfo.place_of_birth +
              "</p>"
          );
        } else {
          $oBiography.toggleClass("hidden");
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
  /* jshint ignore:end */

  // =================================================================== //
  // =========== End Event Handler Actor Info ========================= //
  // ================================================================== //

  // ============================================================== //
  // ================ Reset Form Function ==== ==================== //
  // ============================================================== //

  function resetForm($form) {
    $oForm.find("input").val("");
  }

  // ============================================================ //
  // =================== End Reset Form ========================= //
  // ============================================================ //

  // ================================================================ //
  // =========== Clear button event handler ========================= //
  // ================================================================ //
  $("#clear").on("click", function(e) {
    e.preventDefault();
    $oContainer.addClass("hidden");
    $oPoster.addClass("hidden");
    $oClear.addClass("hidden");
    $(".character").remove();
    $(".crew").remove();

    resetForm($("form[name=searchForm]")); // by name
  });
  // ===================================================================== //
  // ============ End #clear button event handler ======================== //
  // ===================================================================== //
}); // ============= End document.ready ========================== //
