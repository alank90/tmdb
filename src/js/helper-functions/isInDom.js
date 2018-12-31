check = function($oClickedParent, iClicked) {
  // Go thru .bio DOM elements and see if present
  // and toggle
  let inDom = false;

  // Iterate thru 0 or more p.bio's to see if the clicked actor/crew
  // already exist in the DOM from a previous click
  $($oClickedParent.children(".bio")).each(function(i) {
    if (
      iClicked === $(this).attr("data-character-index") ||
      iClicked === $(this).attr("data-crew-index")
    ) {
      // Clicked actor/item exists in the DOM
      // We will return The clicked actor/crew's
      // p.bio element and toggle it's .hidden class in main.js
      inDom = $(this);
    }
  }); // End .each
  return inDom;
};

module.exports = check;
