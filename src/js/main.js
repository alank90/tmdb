// =========  /src/js/main.js ============================ //

// ========== Module Dependencies ================= //
const displayMoviePage = require("./displayContent/displayMoviePage");
const getMovieInfo = require("./helper-functions/getMovieInfo");
const displayBioInfo = require("./displayContent/displayBioInfo");

$(document).ready(function() {
  // =====  Declare Method Variables ============= //
  var $oForm = $("form");
  var $oContainer = $("#container");
  var oMovieInfo = {};
  var $oPoster = $("#poster");
  var $oClear = $("#clear");

  // ===== End Variable Declarations =========== //

  $oContainer.addClass("hidden");
  $oClear.addClass("hidden");

  // ===================================================================== //
  // ============ TMDB Query Event Handler =============================== //
  // ===================================================================== //

  /* jshint ignore:start */
  $oForm.on("submit", async function(e) {
    e.preventDefault();
    oMovieInfo = await getMovieInfo();

    $("#poster").html(
      '<center><img src="./src/img/loading.gif" alt="loading..."></center>'
    ); //gif while poster loads.

    displayMoviePage(oMovieInfo, $oContainer);

    $oContainer.removeClass("hidden"); // Make Results Container Visible
    $oClear.removeClass("hidden"); // Show the clear button
  });
  /* jshint ignore:end */
  // ===================================================================== //
  // ============ End TMDB Query EventHandler ============================ //
  // ===================================================================== //

  // ================================================================== //
  // ====== Event Handler for Getting Actor/CrewBio Info == =========== //
  // ================================================================== //

  // Important! - Had to use event delegation here
  $(".cast, .production").on("click", ".actor, .director-writer", function(
    event
  ) {
    displayBioInfo(event, oMovieInfo);
  });

  // =================================================================== //
  // =========== End Event Handler Actor/Crew Bio ===================== //
  // ================================================================== //

  // ============================================================== //
  // ================ Reset Form Function ==== ==================== //
  // ============================================================== //

  function resetForm() {
    $oForm.find("input").val("");
  }

  // ============================================================ //
  // =================== End Reset Form ========================= //
  // ============================================================ //

  // ================================================================ //
  // =========== Clear button event handler ========================= //
  // ================================================================ //
  $("#clear").on("click", function(e) {
    e.preventDefault();
    $oContainer.addClass("hidden");
    $oPoster.addClass("hidden");
    $oClear.addClass("hidden");
    $(".character").remove();
    $(".crew").remove();

    resetForm($("form[name=searchForm]")); // by name
  });
  // ===================================================================== //
  // ============ End #clear button event handler ======================== //
  // ===================================================================== //
  
}); // ============= End document.ready ========================== //
