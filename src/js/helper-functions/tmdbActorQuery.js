// =========  /src/js/helper-functions/tmdbActorQuery.js ============================ //
const apiKey = require("../../../resources/config");

// ====================================================== //
// ======= Let's Get ActorInfo w/async/await =========== //
// ====================================================== //
/* jshint ignore:start */

const tmdbActorQuery = async function(iActorId) {
  try {
    // Query string to retrieve TMDB Actor Info
    let sQueryActorUrl =
      "https://api.themoviedb.org/3/person/" +
      iActorId +
      "?api_key=" +
      apiKey +
      "&language=en-US";

    let sAjaxSettings = {
      dataType: "json",
      async: true,
      crossDomain: true,
      url: sQueryActorUrl,
      method: "GET",
      headers: {},
      data: "{}"
    };

    let actorInfo = await $.ajax(sAjaxSettings);

    return actorInfo;
  } catch (e) {
    console.log(e);
    return $(".actor > span").html("<h3>Error retrieving actor info</h3>");
  }
};
/* jshint ignore:end */

module.exports = tmdbActorQuery;
