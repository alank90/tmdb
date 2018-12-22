let $oBiography = $(el).closest("li");

        // Check if p.bio is in the DOM or not
        if ($oBiography.children(".bio").length === 0) {
          // need to add p.bio to DOM
          $oBiography.append(
            "<p class='bio' data-crew-index=" +
              $(el).attr("data-crew-index") +
              ">" +
              oPersonInfo.biography +
              "<br>" +
              "Born: " +
              oPersonInfo.place_of_birth +
              "</p>"
          );
          // Newly clicked person has not been clicked before so
          // add it to the DOM
        } else if (
          $(el).attr("data-crew-index") !==
          $oBiography.children(".bio").attr("data-crew-index")
        ) {
          $oBiography.append(
            "<p class='bio' data-crew-index=" +
              $(el).attr("data-crew-index") +
              ">" +
              oPersonInfo.biography +
              "<br>" +
              "Born: " +
              oPersonInfo.place_of_birth +
              "</p>"
          );
        } else {
          $oBiography.children(".bio").toggleClass("hidden");
        }