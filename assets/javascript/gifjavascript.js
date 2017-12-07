let baseURL = "https://api.giphy.com/v1/gifs/search?api_key=YGMklTUgJhQ6vVLRc99pHErqIfYY6Ouw"
let gifSearches = ["Cats Falling Down", "Bob Ross", "Make It Rain", "Ridiculous Dogs"];
let numResults = 0;
let ratingResult;

// runs the ajax function and builds and adds the gifs
let runQuery = (numResults, queryURL) => {
  //Create AJAX call
  $.ajax({
    url:queryURL,
    method: "GET"
  }).done(function(response) {
    $("#gifView").empty();
    for (let i = 0; i < numResults; i++) {

      // creating a div to hold the gif thumbnail
      let gifDiv = $("<div class='thumbnail col-md-4'>");
      gifDiv.attr("id", "gifThumb-" + i);
      $("#gifView").append(gifDiv);
      // let ratings = response.data[i].rating
      let imgURLA = response.data[i].images.fixed_height.url;
      let imgURLS = response.data[i].images.fixed_height_still.url;
      let image = $("<img class='gifClass' data-state='animate'>").attr("src", imgURLA);
      image.attr("animatedURL", imgURLA);
      image.attr("stillURL", imgURLS);
      $(gifDiv).append(image);
      $("#gifThumb-" + i).append('<h5 class="text-center">' + response.data[i].rating.toUpperCase() + "</h5>");
    };
  });
};

// render button function
let renderButtons = () => {

  // empties out the buttons so they dont keep adding
  $("#searchBtns").empty();

  // loop through array of gifSearches
  for (let i = 0; i < gifSearches.length; i++) {

    // set a variable to create buttons
    let a = $("<button class='gifBtn btn btn-default btn-info'>")
    // add a data-attirbute
    a.attr("data-name", gifSearches[i]);
    // Providing the button text
    a.text(gifSearches[i]);
    //appends the buttons to the button dump
    $("#searchBtns").append(a);
  };
};

// add search term button click event
$("#addGif").on("click", function (event) {
  //prevents default response
  event.preventDefault();
  // grabs input in the textbox
  let term = $("#searchInput").val().trim();
  // adds the search term to the gifSearch array
  gifSearches.push(term);
  // Calls renderButtons function
  renderButtons();
});

// event listener for clicking on .gifBtn buttons
$(document).on('click', '.gifBtn', function() {
  // sets a searchterm based on the data-name attr
  let searchTerm = $(this).attr("data-name");
  console.log(searchTerm);
  //sets a new url based on the search term on the button
  let newURL = `${baseURL}&q=${searchTerm}`;

  // get requested number of results
  numResults = $('#numRecords').val()

  ratingResult = $('#ratingRecord').val()

  if (ratingResult != "null") {
    newURL += `&rating=${ratingResult}`
  };

  // Send the ajax call the newURL and number of results
  console.log(newURL);
  runQuery(numResults, newURL);
});

// gif pausing function
$(document).on("click", ".gifClass", function() {
  let state = $(this).attr("data-state");
  if (state === "animate") {
    $(this).attr("src", $(this).attr("stillURL"));
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).attr("animatedURL"));
    $(this).attr("data-state", "animate");
  };
});
// renders intial array
renderButtons();