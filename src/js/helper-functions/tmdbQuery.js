// =========  /src/js/tmdbQuery.js ============================ //

// ====================================================== //
// ======= Let's Get Movie Info w/async/await =========== //
// ====================================================== //
/* jshint ignore:start */

const tmdbQuery = async function() {
  try {
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
      dataType: "json",
      async: true,
      crossDomain: true,
      url: sQueryMovieIdUrl,
      method: "GET",
      headers: {},
      data: "{}"
    };

    // get the movie id first from TMDB database
    let idResponse = await $.ajax(settingsAjax1);
    console.log(idResponse);

    // Check if any results returned
    if (idResponse.total_results > 0) {
      iTmdbId = idResponse.results[0].id;

      //Query string to retrieve Movie Info
      let sQueryMovieInfoUrl =
        "https://api.themoviedb.org/3/movie/" + iTmdbId + "?api_key=" + api_key;

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
      console.log(movieInfo);
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
