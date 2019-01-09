// =========  /src/js/helper-functions/getBioInfo.js ==================== //

const getPersonInfo = require("../helper-functions/getPersonInfo");
const isInDom = require("../helper-functions/isInDom");

/* jshint ignore:start */
const displayBioInfo = async function(event, oMovieInfo) {
  try {
    const el = event.target;

    if ($(el).hasClass("actor")) {
      var iPersonId = $(el).data("character-index");
    } else if ($(el).hasClass("director-writer")) {
      var iPersonId = $(el).data("crew-index");
    } else {
      console.log("Error with Personid");
    }

    let oPersonInfo = await getPersonInfo(iPersonId);

    // This the Parent li for the clicked actor or crew
    let $oClickedParent = $(el).closest("li");

    // Check if any bio exist in DOM for this actor or crew member
    if ($oClickedParent.children(".bio").length === 0) {
      // need to add p.bio for clicked element  to DOM
      if ($oClickedParent.hasClass("character")) {
        $oClickedParent.append(
          "<p class='bio' data-character-index=" +
            $(el).attr("data-character-index") +
            ">" +
            oPersonInfo.biography +
            "<br>" +
            "Born: " +
            oPersonInfo.place_of_birth +
            "<img src=" +  oPersonInfo.profile_path + "></p>" 
        );
      } else if ($oClickedParent.hasClass("crew")) {
        $oClickedParent.append(
          "<p class='bio' data-crew-index=" +
            $(el).attr("data-crew-index") +
            ">" +
            oPersonInfo.biography +
            "<br>" +
            "Born: " +
            oPersonInfo.place_of_birth +
            "</p>"
        );
      } else {
        throw "errror. No data-*-index attribute in <li> parent element";
      }
    } else {
      // Check if current actor/crew bio has been clicked before. If so,
      // toggle it
      let dataIndexValue;
      if (
        !($(el).attr("data-character-index") || $(el).attr("data-crew-index"))
      ) {
        throw "No $(el).attr data-*-index";
      } else if ($(el).attr("data-character-index")) {
        dataIndexValue = $(el).attr("data-character-index");
      } else {
        dataIndexValue = $(el).attr("data-crew-index");
      }

      let checkDom = isInDom($oClickedParent, dataIndexValue);

      if (checkDom) {
        // toggle element
        checkDom.toggleClass("hidden");
      } else {
        // Add it to the DOM
        // Clicked Person/Cast's biography was not in DOM so we will add it
        // We only get this far if the clicked Actor/Crew Bio
        // was not found in the DOM
        $oClickedParent.append(
          "<p class='bio' data-crew-index=" +
            dataIndexValue +
            ">" +
            oPersonInfo.biography +
            "<br>" +
            "Born: " +
            oPersonInfo.place_of_birth +
            "</p>"
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
};
/* jshint ignore:end */

module.exports = displayBioInfo;
