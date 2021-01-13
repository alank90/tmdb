// =========  /src/js/main.js ============================ //

// ========== Module Dependencies ================= //
const displayMoviePage = require("./displayContent/displayMoviePage");
const getMovieInfo = require("./helper-functions/getMovieInfo");
const displayBioInfo = require("./displayContent/displayBioInfo");
const searchComplete = require("./helper-functions/searchComplete");
const displayTvPage = require("./displayContent/displayTvPage");
const getTvInfo = require("./helper-functions/getTvInfo");

$(document).ready(function () {
  // =====  Declare/Initialize Variables ============= //
  let $oForm = $("form");
  let $oMovie_Data_Plot = $("#movie-data-plot");
  let $oMovie_Cast_Crew = $("#movie-cast-crew");
  let oMovieInfo = {};

  let oTvInfo = {};
  let $oTv_Data_Overview = $("#tv-data-overview");
  let $oTv_Cast_Crew = $("#tv-cast-crew");
  let $oPoster = $("#poster");
  let $oClear = $("#clear");

  // ===== End Variable Declarations =========== //

  // ===== Hide info area initially ======= //
  $oMovie_Data_Plot.addClass("hidden");
  $oMovie_Cast_Crew.addClass("hidden");
  $oTv_Data_Overview.addClass("hidden");
  $oTv_Cast_Crew.addClass("hidden");
  $oClear.addClass("hidden");

  // ======== Initiate Autocomplete =========== //
  $("#name").on("focus", function () {
    let radioChecked = false;

    radioChecked = $("input[value=movie]:checked").length > 0;
    if (radioChecked) {
      const buttonSelected = "movie";
      $("#name").autocomplete(); // instantiate autocomplete if necesssary
      let disabled = $("#name").autocomplete("option", "disabled");
      if (disabled) {
        $("#name").autocomplete("option", "disabled", false);
      }
      searchComplete(buttonSelected);
    } else {
      // Series was selected
      const buttonSelected = "tv";
      $("#name").autocomplete();
      let disabled = $("#name").autocomplete("option", "disabled");
      if (disabled) {
        $("#name").autocomplete("option", "disabled", false);
      }
      searchComplete(buttonSelected);
    }
  });

  // ===================================================================== //
  // ============ TMDB Query Event Handler =============================== //
  // ===================================================================== //

  /* jshint ignore:start */
  $(".submit").on("click", async function (e) {
    e.preventDefault();

    let radioValue = $("input[value='movie']:checked").val();
    if (radioValue) {
      oMovieInfo = await getMovieInfo();

      $("#poster").html(
        '<center><img src="./src/img/loading.gif" alt="loading..."></center>'
      ); //gif while poster loads.

      displayMoviePage(oMovieInfo, $oMovie_Data_Plot, $oMovie_Cast_Crew);

      $oMovie_Data_Plot.removeClass("hidden"); // Make Results Container Visible
      $oMovie_Cast_Crew.removeClass("hidden");
      $oClear.removeClass("hidden"); // Show the clear button
    } else {
      oTvInfo = await getTvInfo();
      $("#poster").html(
        '<center><img src="./src/img/loading.gif" alt="loading..."></center>'
      ); //gif while poster loads.

      displayTvPage(oTvInfo, $oTv_Data_Overview, $oTv_Cast_Crew);

      $oTv_Data_Overview.removeClass("hidden"); // Make Results Container Visible
      $oTv_Cast_Crew.removeClass("hidden");
      $oClear.removeClass("hidden"); // Show the clear button
    }
  });
  /* jshint ignore:end */
  // ===================================================================== //
  // ============ End TMDB Query EventHandler ============================ //
  // ===================================================================== //

  // =================================================================== //
  // ====== Event Handler for Getting Actor/Crew Bio Info == =========== //
  // =================================================================== //

  // Important! - Had to use event delegation here
  $(".cast, .production").on(
    "click",
    ".actor, .director-writer",
    function (event) {
      displayBioInfo(event);
    }
  );

  // ================================================================== //
  // =========== End Event Handler Actor/Crew Bio ===================== //
  // ================================================================== //

  // ================================================================ //
  // =========== Clear button event handler ========================= //
  // ================================================================ //
  $("#clear").on("click", function (e) {
    e.preventDefault();

    function resetForm() {
      $oForm.find("input:not[value='movie']").val("");
    }
    // Hide all pertinent elements
    $oMovie_Data_Plot.addClass("hidden");
    $oPoster.addClass("hidden");
    $oMovie_Cast_Crew.addClass("hidden");
    $oTv_Data_Overview.addClass("hidden");
    $oTv_Cast_Crew.addClass("hidden");
    $oClear.addClass("hidden");
    $(".character").remove();
    $(".crew").remove();
    $(".lastAirDate").remove();
    $(".tv_url").remove();
    $(".cast").remove();

    resetForm($("form[name=searchForm]")); // by name
  });
  // ================================================================ //
  // ============ End #clear button event handler =================== //
  // ================================================================ //
}); // ============= End document.ready ========================== //
