check = function($oClickedParent, iClicked, $this_clicked) {
  // Go thru .bio DOM elements and see if present
  // and toggle
  $($oClickedParent.children(".bio")).each(function(i) {
    console.log("In the Each");
    console.log(iClicked);
    console.log($this_clicked);
    if (iClicked === $this_clicked) {
      // crew item in the DOM, just toggle it
      console.log("In the if");
      console.log("toggle the element" + $this_clicked);
      $(this).toggleClass("hidden");
      return true;
    } else {
      return false;
    }
  }); // End .each
};

module.exports = check;
