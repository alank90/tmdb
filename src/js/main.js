// =========  /src/js/main.js ============================ //

// ========== Module Dependencies ================= //
const displayMoviePage = require("./displayContent/displayMoviePage");
const getMovieInfo = require("./helper-functions/getMovieInfo");
const displayBioInfo = require("./displayContent/displayBioInfo");
const searchComplete = require("./helper-functions/searchComplete");

$(document).ready(function() {
  // =====  Declare Method Variables ============= //
  var $oForm = $("form");
  var $oMovie_Data_Plot = $("#movie-data-plot");
  var $oMovie_Cast_Crew = $("#movie-cast-crew");
  var oMovieInfo = {};
  var $oPoster = $("#poster");
  var $oClear = $("#clear");

  // ===== End Variable Declarations =========== //

  $oMovie_Data_Plot.addClass("hidden");
  $oMovie_Cast_Crew.addClass("hidden");
  $oClear.addClass("hidden");

  // ======== Initiate Autocomplete =========== //
  $("#name").on("focus", function() {
    let radioChecked = false;

    radioChecked = $("input[value=movie]:checked").length > 0;
    if (radioChecked) {
      $("#name").autocomplete(); // instantiate autocomplete if necesssary
      let disabled = $("#name").autocomplete("option", "disabled");
      if (disabled) {
        $("#name").autocomplete("option", "disabled", false);
      }
      searchComplete();
    } else {
      $("#name").autocomplete();
      $("#name").autocomplete("disable");
    }
  });

  // ===================================================================== //
  // ============ TMDB Query Event Handler =============================== //
  // ===================================================================== //

  /* jshint ignore:start */
  $(".submit").on("click", async function(e) {
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
      alert("TV series lookup coming soon!");
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
  $(".cast, .production").on("click", ".actor, .director-writer", function(
    event
  ) {
    displayBioInfo(event);
  });

  // ================================================================== //
  // =========== End Event Handler Actor/Crew Bio ===================== //
  // ================================================================== //

  // ================================================================ //
  // =========== Clear button event handler ========================= //
  // ================================================================ //
  $("#clear").on("click", function(e) {
    e.preventDefault();

    function resetForm() {
      $oForm.find("input:not[value='movie']").val("");
    }

    $oMovie_Data_Plot.addClass("hidden");
    $oPoster.addClass("hidden");
    $oMovie_Cast_Crew.addClass("hidden");
    $oClear.addClass("hidden");
    $(".character").remove();
    $(".crew").remove();

    resetForm($("form[name=searchForm]")); // by name
  });
  // ================================================================ //
  // ============ End #clear button event handler =================== //
  // ================================================================ //
}); // ============= End document.ready ========================== //
