// ===== /src/js/helper-functions/displayTVPage.js ======== //

// ============ Variable Declarations ========== //
let $oError = $(".error_message");
let creators = "";

// ==== Call TMDB API and get TV info ============== //
/* jshint ignore:start */
let displayPage = async function (oTvInfo, $oTv_Data_Overview, $oTv_Cast_Crew) {
  // Now we can paint the page w/oTvInfo object
  // First Lets check state of the TV Info .tv container
  if ($oError.not(".hidden")) {
    $oError.addClass("hidden");
  }
  // Also empty Dom node p.cast and p.crew if present from a previous query
  if ($(".character") || $(".crew")) {
    $(".character").remove();
    $(".crew").remove();
  }

  // ========= Let's retrieve the TV poster image ============= //
  let sTvPoster = "https://image.tmdb.org/t/p/w342/" + oTvInfo.poster_path;
  $("#poster").html("<img src='" + sTvPoster + "' alt='No Poster Available'>");
  if ($("#poster").hasClass("hidden")) {
    $("#poster").removeClass("hidden");
  }
  // ========== end retrieve TV Poster Image ================ //

  // Let's fill in the page with oTvInfo object retrieved from TMDB

  // Tv Overview
  $oTv_Data_Overview
    .find(".title")
    .html("<p>TV Series:</p><p>" + oTvInfo.name + "</p>");
  $oTv_Data_Overview
    .find(".tagline")
    .html("<p></p><p>" + oTvInfo.tagline + "</p>");
  $oTv_Data_Overview
    .find(".overview")
    .html("<p>TV Overview</p><p>" + oTvInfo.overview + "</p>");

  // Create a string of Creators
  // Check array has previous results and clear
  oTvInfo.created_by.forEach((creator) => {
    creators += ` ${creator.name}`;
  });
  $oTv_Data_Overview
    .find(".createdBy")
    .html(`<p>Series Creator(s)</p><p>${creators}</p>`);

  $oTv_Data_Overview.find(".network").html(
    `<ul>
      <li>Series Network/Service<span>${oTvInfo.networks[0].name}</span></li>
      <li>Number of Episodes<span>${oTvInfo.number_of_episodes}</span></li>
      <li>Seasons<span>${oTvInfo.number_of_seasons}</span></li>
    </ul>`
  );

  $oTv_Data_Overview
    .find(".firstAirDate")
    .html(`<p>Premiered</p><p>${oTvInfo.first_air_date}</p>`);

  if (oTvInfo.next_episode_to_air) {
    $oTv_Data_Overview
      .find(".nextAirDate")
      .html(
        "<p>Next Air Date</p><p>" +
          oTvInfo.next_episode_to_air.air_date +
          "</p>" +
          "<p>Next Episode:" +
          oTvInfo.next_episode_to_air.name +
          "</p>" +
          "<p>" +
          oTvInfo.next_episode_to_air.overview +
          "</p>"
      );
  } else {
    $oTv_Data_Overview
      .find("p.nextAirDate")
      .text("Series Not Currently Airing New Episodes");
  }

  $oTv_Data_Overview
    .find(".lastAirDate")
    .html(
      "<p class='lastAirDate'>Last Air Date</p><p>" +
        oTvInfo.last_episode_to_air.air_date +
        "</p>" +
        "<p class='lastAirDate'>Last Episode:" +
        oTvInfo.last_episode_to_air.name +
        "</p>" +
        "<p class='.lastairdate'>" +
        oTvInfo.last_episode_to_air.overview +
        "</p>"
    );

  // TV Cast & Crew
  // Check if there is a TV Page URL
  if (oTvInfo.homepage) {
    $oTv_Cast_Crew.find(".tv_url").attr({
      href: oTvInfo.homepage,
      target: "_blank",
    });
  } else {
    $oTv_Cast_Crew
      .find("p > .tv_url ")
      .text("No Series Homepage Available")
      .attr("href", "");
  }

  /*
  // Cast Listing
  let aCastOfCharacters = oTvInfo.credits.cast;
  // filter first 10 cast entries
  aCastOfCharacters = aCastOfCharacters.filter((el, index) => {
    return index <= 10;
  });

  // Crew listing
  let aCrew = oTvInfo.credits.crew;

  aCrew = aCrew.filter((el) => {
    return (
      (el.department === "Directing" && el.job === "Director") ||
      (el.department === "Writing" && el.job === "Screenplay") ||
      (el.department === "Writing" && el.job === "Writer")
    );
  });

  // Then print out
  aCastOfCharacters.forEach((el) => {
    $oTv_Cast_Crew
      .find(".cast")
      .append(
        "<li class='character'> <span>" +
          el.character +
          "</span><span class='actor' title='Click To See Their Biography' data-character-index=" +
          el.id +
          ">" +
          el.name +
          "</span> </li>"
      );
  });

  aCrew.forEach((el) => {
    if ($(".crew:last > span:first").text() === el.job) {
      $oTv_Cast_Crew
        .find(".production .crew:last")
        .append(
          "<span class='director-writer' title='Click To See Their Biography' data-crew-index=" +
            el.id +
            ">" +
            el.name +
            "</span>"
        );
    } else {
      $oTv_Cast_Crew
        .find(".production")
        .append(
          "<li class='crew'><span>" +
            el.job +
            "</span><span title='Click To See Their Biography' class='director-writer' data-crew-index=" +
            el.id +
            ">" +
            el.name +
            "</span>"
        );
    }
  });

  $oTv_Cast_Crew
    .find(".release_date")
    .html(
      "<p class='release_date'>Release Date:</p><p>" + oTvInfo.release_date + "</p>"
    );
  oTvInfo.revenue = oTvInfo.revenue
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //Convert to Dollars
  $oTv_Cast_Crew
    .find(".revenue")
    .html("<p class='revenue'>Tv Revenues:</p>" + "$" + oTvInfo.revenue);
  $oTv_Cast_Crew
    .find(".runtime")
    .html("<p class='runtime'>Runtime:</p>" + oTvInfo.runtime + " Minutes");
  */
};
/* jshint ignore:end */
// =========================================================================== //
// ============== End of displayTvPage function =========================== //
// =========================================================================== //

module.exports = displayPage;
