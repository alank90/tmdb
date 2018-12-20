/* let $oBiography = $(el).children(".bio");
         */
        // Check if p.bio is in the DOM or not
        if ($(".production > .bio").length) {
            // need to remove p.bio from DOM
            $(".bio").toggleClass("hidden");
          } else {
            $(".production").append(
              "<p class='bio'>" +
                oPersonInfo.biography +
                "<br>" +
                "Born: " +
                oPersonInfo.place_of_birth +
                "</p>"
            );
          }