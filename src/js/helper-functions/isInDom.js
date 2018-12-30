check = function($oClickedParent, iClicked) {
  // Go thru .bio DOM elements and see if present
  // and toggle
  let inDom = false;
  console.log($oClickedParent);
  $($oClickedParent.children(".bio")).each(function(i) {
    console.log("Span element clicked " + iClicked);
    console.log(
      "This .each data-index-value " + $(this).attr("data-crew-index")
    );
    if (
      iClicked === $(this).attr("data-character-index") ||
      iClicked === $(this).attr("data-crew-index")
    ) {
      // clicked actor/item in the DOM
      inDom = $(this);
    }
  }); // End .each
  return inDom;
};

module.exports = check;
