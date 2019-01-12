// ===== /src/js/helper-functions/displayMoviePage.js ======== //

// ============ Variable Declarations ========== //
let $oError = $(".error_message");

$oError.addClass("hidden");

// ==== Call TMDB API and get movie info ============== //
/* jshint ignore:start */
let displayPage = async function(
  oMovieInfo,
  $oMovie_Data_Plot,
  $oMovie_Cast_Crew
) {
  // Now we can paint the page w/oMovieInfo object
  // First Lets check state of the Movie Info .movie container
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
  $oMovie_Data_Plot
    .find(".title")
    .html("<p class='title'>Movie Title:</p>" + oMovieInfo.title);
  $oMovie_Data_Plot
    .find(".tagline")
    .html("<p class='tagline'></p>" + oMovieInfo.tagline);
  $oMovie_Data_Plot
    .find(".plot")
    .html("<p class='plot'>Movie Overview</p>" + oMovieInfo.overview);

  // Cast Listing
  let aCastOfCharacters = oMovieInfo.credits.cast;
  // filter first 10 cast entries
  aCastOfCharacters = aCastOfCharacters.filter((el, index) => {
    return index <= 10;
  });

  // Crew listing
  let aCrew = oMovieInfo.credits.crew;

  aCrew = aCrew.filter(el => {
    return (
      (el.department === "Directing" && el.job === "Director") ||
      (el.department === "Writing" && el.job === "Screenplay") ||
      (el.department === "Writing" && el.job === "Writer")
    );
  });

  // Then print out
  aCastOfCharacters.forEach(el => {
    $oMovie_Cast_Crew
      .find(".cast")
      .append(
        "<li class='character'> <span>" +
          el.character +
          "</span><span class='actor' title='Click To See Their Biography' data-character-index=" +
          el.id +
          ">" +
          el.name +
          "</span> </li>"
      );
  });

  aCrew.forEach(el => {
    if ($(".crew:last > span:first").text() === el.job) {
      $oMovie_Cast_Crew
        .find(".production .crew:last")
        .append(
          "<span class='director-writer' title='Click To See Their Biography' data-crew-index=" +
            el.id +
            ">" +
            el.name +
            "</span>"
        );
    } else {
      $oMovie_Cast_Crew
        .find(".production")
        .append(
          "<li class='crew'><span>" +
            el.job +
            "</span><span title='Click To See Their Biography' class='director-writer' data-crew-index=" +
            el.id +
            ">" +
            el.name +
            "</span>"
        );
    }
  });

  $oMovie_Cast_Crew
    .find(".release_date")
    .html(
      "<p class='release_date'>Release Date:</p>" + oMovieInfo.release_date
    );
  oMovieInfo.revenue = oMovieInfo.revenue
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //Convert to Dollars
  $oMovie_Cast_Crew
    .find(".revenue")
    .html("<p class='revenue'>Movie Revenues:</p>" + "$" + oMovieInfo.revenue);
  $oMovie_Cast_Crew
    .find(".runtime")
    .html("<p class='runtime'>Runtime:</p>" + oMovieInfo.runtime + " Minutes");
  // Check if there is a Movie Page URL
  if (oMovieInfo.homepage) {
    $oMovie_Cast_Crew.find(".movie_url").attr({
      href: oMovieInfo.homepage,
      target: "_blank"
    });
  } else {
    $oMovie_Cast_Crew
      .find("p .movie_url ")
      .text("Movie Page Not Available")
      .attr("href", "");
  }
};
/* jshint ignore:end */
// =========================================================================== //
// ============== End of displayMoviePage function =========================== //
// =========================================================================== //

module.exports = displayPage;
