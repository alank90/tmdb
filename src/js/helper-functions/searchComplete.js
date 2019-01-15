// =========  /src/js/helper-functions/searchComplete.js ==================== //

const searchComplete = function() {
  $("#name").autocomplete({
    minLength: 2,
    source: function(request, response) {
      $.getJSON(
        "https://api.themoviedb.org/3/search/movie?api_key=5888233c985dfa60ed6be20d8e6726a1",
        { query: request.term },
        response
      );
    }
  });
};

module.exports = searchComplete;
