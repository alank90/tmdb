// === /src/js/helper-functions/getMovieInfo.js ====================== //

const tmdbQuery = require("./tmdbQuery");

/* jshint ignore:start */

let getTvInfo = async function () {
  let searchType = "tv";
  let tvInfo = await tmdbQuery(searchType);
  return tvInfo;
};
/* jshint ignore:end */
// =========================================================================== //
// ============== End of displayMoviePage function =========================== //
// =========================================================================== //

module.exports = getTvInfo;
