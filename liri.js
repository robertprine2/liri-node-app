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

// ***might not need*** uses the value entered if needed for the function

var value = process.argv[3];

// switch to call the different functions

switch(action) {
	case 'my-tweets': 
		my-tweets();
		break;
	case 'spotify-this-song':
		spotify-this-song();
		break;
	case 'movie-this':
		movie-this();
		break;
	case 'do-what-it-says':
		do-what-it-says();
} // end of switch

// if my-tweets show the last 20 tweets and when they were created

function my-tweets(){

}

// if spotify-this-song shows information about the song that is selected

function spotify-this-song() {

}

// if movie-this shows information about the movie selected

function movie-this() {

	// Store all of the arguments in an array

	var nodeArgs = process.argv;

	// Create an empty variable for holding the movie name

	var movieName = "";

	// if no movie title was entered search Mr. Nobody

	if (process.argv[3] == undefined) {

	   	movieName = Mr. Nobody;

	} // end of if no movie title was entered

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

	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json';

	request(queryUrl, function (error, response, body) {

	    // If the request is successful 

	    if (!error && response.statusCode == 200) {

	        // Parse the body of the site and recover just the imdbRating
	        
	        console.log("Release Year: " + JSON.parse(body)["Year"])
	    } // end of if the request is successful
	}); // end of request

} // end of movie-this function

// if do-what-it-says reads the txt file and calls the function associated with it

function do-what-it-says() {

} // end of do-what-it-says function