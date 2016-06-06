// load the fs package to read and write

var fs = require('fs');

// load the request package

var request = require('request');

// *********load twitter package

var twitter = require('twitter');

// *********load spotify package

var spotify = require('spotify');

// load keys.js to access twitter keys

var twitterKeys = require('./keys.js');
console.log(twitterKeys);

// call the function that you want to use

var action = progress.argv[2];

// uses the value entered if needed for the function

var value = process.argv[3];

function runApp(action, value) {

	// switch to call the different functions

	switch(action) {
		case 'my-tweets': 
			myTweets();
			break;
		case 'spotify-this-song':
			spotifyThisSong();
			break;
		case 'movie-this':
			movieThis();
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
	} // end of switch

} // end of runApp function

// if my-tweets show the last 20 tweets and when they were created

function myTweets(){

}

// if spotify-this-song shows information about the song that is selected

function spotifyThisSong() {

}

// if movie-this shows information about the movie selected

function movieThis() {

	// Store all of the arguments in an array

	var nodeArgs = process.argv;

	// if user enters a value - process.argv[3]

	if (value) {

	   	// Create an empty variable for holding the movie name

		var movieName = "";

	} // end of if no movie title was entered

	// else no movie title was entered search Mr. Nobody

	else {

		movieName = "Mr. Nobody";

	} // end of else

	// Change any " " to + in the movie title

	for (var i = 3; i < nodeArgs.length; i++){

		// if the movie has more than one word

	    if (i > 3 && i < nodeArgs.length){

	        movieName = movieName + "+" + nodeArgs[i];

	    } // end of if there are spaces

	    // the first word of the movie title

	    else {

	        movieName = movieName + nodeArgs[i];

	    } // end of else

	    console.log(movieName)

	} // end of for loop

	// OMDB API request 

	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&tomatoes=true';

	request(queryUrl, function (error, response, body) {

	    // If the request is successful 

	    if (!error && response.statusCode == 200) {

	        // Parse the body of the site and recover just the imdbRating
	        
	        console.log("Release Year: " + JSON.parse(body)["Year"])
	    } // end of if the request is successful
	}); // end of request

} // end of movie-this function

// if do-what-it-says reads the txt file and calls the function associated with it

function doWhatItSays() {

} // end of do-what-it-says function

runApp(action, value);