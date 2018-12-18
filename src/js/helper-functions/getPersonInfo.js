// ======== /src/js/helper-functions/getActorInfo =============
const tmdbActorQuery = require("./tmdbActorQuery");

/* jshint ignore:start */

let getPersonInfo = async function(iActorid) {
  let actorInfo = await tmdbActorQuery(iActorid);
  return actorInfo;
};
/* jshint ignore:end */
// =========================================================================== //
// ============== End of displayMoviePage function =========================== //
// =========================================================================== //

module.exports = getPersonInfo;
