// === /src/js/helper-functions/displayMoviePage ============================= //

const tmdbQuery = require("./tmdbQuery");

/* jshint ignore:start */
displayMoviePage = async function() {
  try {
    let oMovieInfo = await tmdbQuery.movieInfo;
    
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
  } catch (e) {
    console.log(e);
    $("#poster").html("<h3>Error retrieving movie info</h3>");
  }
};
/* jshint ignore:end */
// =========================================================================== //
// ============== End of displayMoviePage function =========================== //
// =========================================================================== //

module.exports = displayMoviePage;
