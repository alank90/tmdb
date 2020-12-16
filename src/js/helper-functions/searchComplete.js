// =========  /src/js/helper-functions/searchComplete.js ==================== //
const apiKey = require("../../resources/config");

/*  Taken from: https://stackoverflow.com/questions/21385892/how-to-use-source-function-and-ajax-in-jquery-ui-autocomplete
    This module uses the jquery ui widget autocomplete. Note that we have to use the source
    option with the Function variation because autocomplete sends the query as ?term="Query String"
    thus the use of the object option { query: request.term} in $.getJSON.
    and the TMDB API is looking for query string as ?query="Query string here". 
      Also, The autocomplete widget expects an array of JSON objects with label and value properties
    (although if you just specify value, it will be used as the label e.g. 
        [
          { label: 'C++', value: 'C++' }, 
          { label: 'Java', value: 'Java' }
          { label: 'COBOL', value: 'COBOL' }
        ]
      ). So for our use we have to use the $.map method to normalize what TMDB API returns, which 
      is a JSON array object of format results[index].property_name to [{label:'property_name', value: 'property_value'} ] 
 */
const searchComplete = function (buttonSelected) {
  $("#name").autocomplete({
    minLength: 2,
    source: function (request, response) {
      // Consume TMDB API
      $.getJSON(
        `https://api.themoviedb.org/3/search/${buttonSelected}?api_key=${apiKey}`,
        { query: request.term },
        function (data) {
          // data contains JSON returned from AJAX call
          const results = data.results;

          if (buttonSelected === "movie") {
            response(
              // A response callback, which expects a single argument:
              // the data to suggest to the user.

              // Normalize the TMDB API returned data
              $.map(results, function (item) {
                return {
                  label: item.title,
                  value: item.title,
                };
              })
            );
          } else {
            response(
              //It's a tv search request
              $.map(results, function (item) {
                return {
                  label: item.name,
                  value: item.name,
                };
              })
            );
          }
        }
      );
    }, // Return normalized data via response  to autocomplete for display
  });
};

module.exports = searchComplete;
