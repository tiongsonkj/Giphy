// initial array of tv shows
var shows = ["The Simpsons", "Game of Thrones", "The Office", "That 70s Show"];

// array that the search inputs will go into
var topics = [];

function createButtons() {

    // Deleting the search buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#search-view").empty();

	// for each element in the array
	for (var i = 0; i < shows.length; i++) {

		// create new button 
		var newBtn = $("<button>");

		// add class to each new button
		newBtn.addClass("gifButton btn btn-success btn-sm");

		// add text to each button which will be the element of the array
		newBtn.text(shows[i]);

		// add data attribute??????
		newBtn.attr("data-name", shows[i]);

		// append the button to HTML (searchview div)
		$("#search-view").append(newBtn);
	}
};

// create function for the submit button to submit the new value into the blank array
$("#add-search").on("click", function() {
	//stops the form from submitting and refreshing the page
	event.preventDefault();

	// push the value from the search into the array
	shows.push($("#search-input").val());

	// calling the function that will create the buttons when pushing the searches into the array
	createButtons();
});

// make each element with class "gifButton" be a click function
function getGifs() {

    // event.preventDefault() can be used to prevent an event's default behavior, prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // grab the value from the search input
    var search = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tYvCvL8Po7UmiKNyyyK2gFknGgQSisvh&q=" + search + "&limit=10";
    
    // use ajax to get the object of the API
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	console.log(response);

    	// clear the gif view so that the gifs won't pile up on each other
    	$("#gif-view").empty();

    	// for loop to print out 10 images instead of just one
    	for (var i = 0; i < 10; i++) {
        	// creating a div to hold the gif
        	var gifDiv = $("<div class='gif'>");

        	// setting the rating of the gif into the variable gifRating
        	var gifRating = response.data[i].rating;

        	// create text for rating of the gif
        	var rating = $("<p>").text("Rating: " + gifRating)

        	// append rating to the gif Div
        	gifDiv.append(rating);

        	// setting the variable to the object property
        	var gifURL = response.data[i].images.fixed_height_small.url;

        	// url for still image
        	var gifURLStill = response.data[i].images.fixed_height_small_still.url;

        	// creating an element to hold the image
        	var image = $("<img>");
        	image.attr("src", gifURLStill);

        	// attributing data-still = to the still gifURL to each image
        	image.attr("data-still", gifURLStill);

        	// attributing data-animate = to the animated gifURL to each image
        	image.attr("data-animate", gifURL);

        	// attributing the data state to still
        	image.attr("data-state", "still");

        	// added class gifImage so that the pause function can specifically be for this class
        	image.addClass("gifImage");

        	// appending image to the gifDiv
        	gifDiv.append(image);

        	// prepending each gifDiv to the gif-view div in html
        	$("#gif-view").prepend(gifDiv);
        }
    });
};

$(document.body).on("click", ".gifImage", function() {
	

	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
		var state = $(this).attr("data-state");

	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value
  	if (state === "still") {
    	$(this).attr("src", $(this).attr("data-animate"));
    	$(this).attr("data-state", "animate");
  	} else {
    	$(this).attr("src", $(this).attr("data-still"));
    	$(this).attr("data-state", "still");
    }     		
});

// adding a click event listener to all elements in body with class of gifButton
$(document.body).on("click", ".gifButton", getGifs);

// calling create buttons function to display initial tv shows
createButtons();