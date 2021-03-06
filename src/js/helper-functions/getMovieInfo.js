// === /src/js/helper-functions/getMovieInfo.js ====================== //

const tmdbQuery = require("./tmdbQuery");

/* jshint ignore:start */

let getMovieInfo = async function () {
  let searchType = "movie";
  let movieInfo = await tmdbQuery(searchType);
  return movieInfo;
};
/* jshint ignore:end */
// =========================================================================== //
// ============== End of displayMoviePage function =========================== //
// =========================================================================== //

module.exports = getMovieInfo;
