// =========  /src/js/helper-functions/tmdbQuery.js ============================ //
const apiKey = require("../../resources/config");

// ====================================================== //
// ======= Let's Get Movie/TV Info w/async/await =========== //
// ====================================================== //
/* jshint ignore:start */

const tmdbQuery = async function (searchType) {
  try {
    //  Begin the two AJAX calls needed to first retrieve ID
    //  and then retrieve Movie/TV Info
    let iTmdbId = 0;
    let sTmdbQuery = $("form").serialize();

    // Query string to retrieve TMDB movie/tv id
    let sQueryUrl = `https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&${sTmdbQuery}`;

    // Ajax Query settings for movie/tv id
    let settingsAjax1 = {
      dataType: "json",
      async: true,
      crossDomain: true,
      url: sQueryUrl,
      method: "GET",
      headers: {},
      data: "{}",
    };

    // Get the id first from TMDB database
    // This is because w/id, API returns more
    // info in the return object about the movie/tv.
    let idQuery = await $.ajax(settingsAjax1);
    // Check if any results returned and assign movie/tv Id
    if (idQuery.total_results > 0) {
      iTmdbId = idQuery.results[0].id;
      // ======== End retrieve Id ===================== //

      //========== Query string to retrieve Movie/TV Info ===== //
      let sQueryInfoUrl = `https://api.themoviedb.org/3/${searchType}/${iTmdbId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

      let settingsAjax2 = {
        dataType: "json",
        async: true,
        crossDomain: true,
        url: sQueryInfoUrl,
        method: "GET",
        headers: {},
        data: "{}",
      };

      // Get searchType info via the movie/tv id with second AJAX call to the TMDB database
      let infoResults = await $.ajax(settingsAjax2);

      return infoResults;
    } else {
      $oContainer.addClass("hidden");
      $oError.removeClass("hidden");
      $oError.html(
        "<p class='title'>No MovieTV Info Found. Try Alternate Spelling or check the Release Date if you entered one...</p>"
      );
    } // end if/else
  } catch (e) {
    console.log(e);
    $("#poster").html("<h3>Error retrieving movie/tv info</h3>");
  }
};

module.exports = tmdbQuery;
