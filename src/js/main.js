// =========  /src/js/main.js ============================ //

// ========== Module Dependencies ================= //
const getMovieInfo = require("./helper-functions/getMovieInfo");
const getActorInfo = require("./helper-functions/getActorinfo");

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
        return index <= 7;
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
            "<div class='character'> <span>" +
              el.character +
              "</span><span class='actor' data-character-index=" +
              index +
              ">" +
              el.name +
              "</span> </div>"
          );
      });

      aCrew.forEach(el => {
        if ($(".crew:last > span:first").text() === el.job) {
          $oContainer
            .find(".crew:last > span:last")
            .append("<span>,</span>" + el.name);
        } else {
          $oContainer
            .find(".production")
            .append(
              "<div class='crew'><span>" +
                el.job +
                "</span><span>" +
                el.name +
                "</span></div>"
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
  // ============ Event Handler for Getting Actor Info ================ //
  // ================================================================== //
  
  /* jshint ignore:start */
  // Had to use event delegation here
  $(".cast").on("click", ".actor", async function(e) {
    let iActorId = oMovieInfo.credits.cast[$(this).data("character-index")].id;
    let oActorInfo = await getActorInfo(iActorId);
    console.log(oActorInfo);
  });
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
