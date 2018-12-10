// =========  /src/js/main.js ============================ //

// ========== Module Dependencies ================= //
const displayMoviePage = require("./helper-functions/displayMoviePage");

$(document).ready(function() {
  // =====  Declare Method Variables ============= //
  var $oForm = $("form");
  var $oContainer = $("#container");
  var $oPoster = $("#poster");
  var $oClear = $("#clear");
  var $oError = $(".error_message");
  // ===== End Variable Declarations =========== //

  $oContainer.addClass("hidden");
  $oClear.addClass("hidden");
  $oError.addClass("hidden");
  
  // ===================================================================== //
  // ============ TMDB Query EventHandler ================================ //
  // ===================================================================== //
  $oForm.on("submit", function(e) {
    e.preventDefault();
    $("#poster").html(
      '<center><img src="./src/img/loading.gif" alt="loading..."></center>'
    ); //gif while poster loads.

    displayMoviePage();
  });
  // ===================================================================== //
  // ============ End TMDB Query EventHandler ============================ //
  // ===================================================================== //
  

  // Reset Form Function ==================================================
  function resetForm($form) {
    $oForm.find("input").val("");
  }

  // =========== Clear button event handler =====================================
  $("#clear").on("click", function(e) {
    e.preventDefault();
    $oContainer.addClass("hidden");
    $oPoster.addClass("hidden");
    $oClear.addClass("hidden");
    resetForm($("form[name=searchForm]")); // by name
  }); // End #clear button event handler
}); // End document.ready
