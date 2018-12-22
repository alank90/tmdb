        let $oBiography = $(el).children(".bio");

        // Check if p.bio is in the DOM or not
        if ($oBiography.length === 0) {
          // need to add p.bio to DOM
          $(el).append(
            "<p class='bio'>" +
              oPersonInfo.biography +
              "<br>" +
              "Born: " +
              oPersonInfo.place_of_birth +
              "</p>"
          );
        } else {
          $oBiography.toggleClass("hidden");
        }