// === /src/js/helper-functions/getMovieInfo.js ====================== //

const tmdbQuery = require("./tmdbQuery");

/* jshint ignore:start */

let getMovieInfo = async function () {
  let movieInfo = await tmdbQuery();
  return movieInfo;
};
/* jshint ignore:end */
// =========================================================================== //
// ============== End of displayMoviePage function =========================== //
// =========================================================================== //

module.exports = getMovieInfo;
