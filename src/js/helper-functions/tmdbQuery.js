// =========  /src/js/helper-functions/tmdbQuery.js ============================ //
const apiKey = require("../../resources/config");

// ====================================================== //
// ======= Let's Get Movie Info w/async/await =========== //
// ====================================================== //
/* jshint ignore:start */

const tmdbQuery = async function() {
  try {
    //  Begin the two AJAX calls needed to first retrieve Movie ID
    //  and then retrieve Movie Info
    var iTmdbId = 0;
    let sTmdbQuery = $("form").serialize();

    // Query string to retrieve TMDB movie id
    let sQueryMovieIdUrl =
      "https://api.themoviedb.org/3/search/movie?api_key=" +
      apiKey +
      "&" +
      sTmdbQuery;

    // Ajax Query settings for movie id
    let settingsAjax1 = {
      dataType: "json",
      async: true,
      crossDomain: true,
      url: sQueryMovieIdUrl,
      method: "GET",
      headers: {},
      data: "{}"
    };

    // Get the movie id first from TMDB database
    // This is because w/movie id, API returns more
    // info in the return object about the movie.
    let movieQuery = await $.ajax(settingsAjax1);

    // Check if any results returned
    if (movieQuery.total_results > 0) {
      iTmdbId = movieQuery.results[0].id;

      //Query string to retrieve Movie Info
      let sQueryMovieInfoUrl =
        "https://api.themoviedb.org/3/movie/" +
        iTmdbId +
        "?api_key=" +
        apiKey +
        "&language=en-US&append_to_response=credits";

      let settingsAjax2 = {
        dataType: "json",
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
  } catch (e) {
    console.log(e);
    $("#poster").html("<h3>Error retrieving movie info</h3>");
  }
};

module.exports = tmdbQuery;
