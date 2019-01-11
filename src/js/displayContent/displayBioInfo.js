// =========  /src/js/helper-functions/getBioInfo.js ==================== //

const getPersonInfo = require("../helper-functions/getPersonInfo");
const isInDom = require("../helper-functions/isInDom");

/* jshint ignore:start */
const displayBioInfo = async function(event) {
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
        // check to see if any bio info to display
        if (oPersonInfo.biography === "") {
          oPersonInfo.biography = "No Biography Available";
          oPersonInfo.place_of_birth = "Not Available";
        }

        $oClickedParent.append(
          "<p class='bio' data-character-index=" +
            $(el).attr("data-character-index") +
            ">" +
            oPersonInfo.biography +
            "<br>" +
            "Born: " +
            oPersonInfo.place_of_birth +
            "</p>" +
            "<a class='person-homepage' href='" +
            oPersonInfo.homepage +
            "' title='Click to go to Person&apos;s Home Page' target='_blank'>" +
            "<img class='bio-pic' alt='No Picture Available' src=https://image.tmdb.org/t/p/w342/" +
            oPersonInfo.profile_path +
            "></a>"
        );
      } else if ($oClickedParent.hasClass("crew")) {
        if (oPersonInfo.biography === "") {
          oPersonInfo.biography = "No Biography Available";
          oPersonInfo.place_of_birth = "Not Available";
        }

        $oClickedParent.append(
          "<p class='bio' data-crew-index=" +
            $(el).attr("data-crew-index") +
            ">" +
            oPersonInfo.biography +
            "<br>" +
            "Born: " +
            oPersonInfo.place_of_birth +
            "</p>" +
            "<a class='person-homepage' href='" +
            oPersonInfo.homepage +
            "' title='Click to go to Person&apos;s Home Page' target='_blank'>" +
            "<img class='bio-pic' alt='No Picture Available' src=https://image.tmdb.org/t/p/w342/" +
            oPersonInfo.profile_path +
            "></a>"
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
        checkDom.next().toggleClass("hidden"); // toggle bio picture also
      } else {
        // Add it to the DOM
        // Clicked Person/Cast's biography was not in DOM so we will add it
        // We only get this far if the clicked Actor/Crew Bio
        // was not found in the DOM
        if (oPersonInfo.biography === "") {
          oPersonInfo.biography = "No Biography Available";
          oPersonInfo.place_of_birth = "Not Available";
        }

        $oClickedParent.append(
          "<p class='bio' data-crew-index=" +
            dataIndexValue +
            ">" +
            oPersonInfo.biography +
            "<br>" +
            "Born: " +
            oPersonInfo.place_of_birth +
            "</p>" +
            "<a class='person-homepage' href='" +
            oPersonInfo.homepage +
            "' title='Click to go to Person&apos;s Home Page' target='_blank'>" +
            "<img class='bio-pic' alt='No Picture Available' src=https://image.tmdb.org/t/p/w342/" +
            oPersonInfo.profile_path +
            "></a>"
        );
      }
    }

    // ============================================================== //
    // === Empty bio home page links are now disabled =============== //
    $(".cast, .production").on("click", "a[href='null']", function(e) {
      e.preventDefault();
    });

    $(".cast, .production").on("mouseenter", "a[href='null']", function(e) {
      const $el = $(e.target).parent();
      $el.removeAttr("title");
    });
    // ========== End Event handler ================================= //
  } catch (e) {
    console.log(e);
  }
};
/* jshint ignore:end */

module.exports = displayBioInfo;
