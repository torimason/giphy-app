$(document).ready(function() {

  var animals = [
    "bulldog" , "cat" , "horse" , "toad" , "pig" , "hawk" , "owl" , 
    "lion" , "bear" , "pigeon" , "llama" , "kangaroo" , "wolf" , "skunk" , 
    "otter" , "sloth" , "panda"
  ];

  function renderButtons() {
    $("#gif-buttons").empty();

    for (var i = 0; i < animals.length; i++) {
      var gifButton = $("<button>");
      gifButton.addClass("gif-button");
      gifButton.attr("data-type", animals[i]);
      gifButton.text(animals[i]);
      $("#gif-buttons").append(gifButton);
    }

  }

  $(document).on("click", ".gif-button", function() {
    $("#gifs").empty();
    $(".gif-button").removeClass("active");
    $(this).addClass("active");

    var animalGif = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=jfGojP41Ez6sscH9cxji1h3xdy12MiYi&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class= 'animal-item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          p.addClass("rating-text");

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");
          
          animalDiv.append(animalImage);
          animalDiv.append(p);
          

          $("#gifs").append(animalDiv);
        }
      });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").val();

      animals.push(newAnimal);

      $("#gif-input").val("");
  

    renderButtons();

  });

  renderButtons();
});
