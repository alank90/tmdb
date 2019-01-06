// =========  /src/js/helper-functions/tmdbActorQuery.js ============================ //

// ====================================================== //
// ======= Let's Get ActorInfo w/async/await =========== //
// ====================================================== //
/* jshint ignore:start */

const tmdbActorQuery = async function(iActorId) {
  try {
    let api_key = "5888233c985dfa60ed6be20d8e6726a1";

    // Query string to retrieve TMDB Actor Info
    let sQueryActorUrl =
      "https://api.themoviedb.org/3/person/" +
      iActorId +
      "?api_key=" +
      api_key +
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
