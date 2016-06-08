// load the fs package to read and write

var fs = require('fs');

// load the request package

var request = require('request');

// *********load twitter package

var twitter = require('twitter');

// *********load spotify package

var spotify = require('spotify');

// load keys.js to access twitter keys

var keys = require('./keys.js');
var keysTwitter = keys.twitterKeys;

console.log(keysTwitter);

// call the function that you want to use

var action = process.argv[2];

// uses the value entered if needed for the function

var value = process.argv[3];

// Store all of the arguments in an array

var nodeArgs = process.argv;

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

	var client = new twitter({

		consumer_key: keysTwitter.consumer_key,
		consumer_secret: keysTwitter.consumer_secret,
		access_token_key: keysTwitter.access_token_key,
		access_token_secret: keysTwitter.access_token_secret

	});

	client.get('statuses/user_timeline', {screen_name: 'RobertPrine', count: 20}, function(error, tweets, response) {
   			
   			for (var prop in tweets){
   				console.log(tweets[prop].text);
   				console.log(tweets[prop].created_at);
   				console.log();

   	// 			fs.appendFile("./log.txt", tweets[prop].text + ' \n' + tweets[prop].created_at  + ' \n', function(err) {
	   //  			if(err) {
	   //     	 			return console.log(err);
	   //  			} // end of if err

				// }); // end of appendFile

   			} // end of for loop

	}); // end of request to twitter for my account

} // end of myTweets function

// if spotify-this-song shows information about the song that is selected

function spotifyThisSong() {

	// if user enters a value - process.argv[3]

	if (value) {

		var song = value;

	} // end of if value = true

	else {

		var song = "what's my age again";

	} // end of else value = true

	// searches spotify API based on process.argv[3]

	spotify.search({ type: 'track', query: song}, function(err, data) {

		// if there is an error

		if (err) {

			console.log('Error occurred: ' + err);
			return;

		} // end of if err

		// else console.dir song information

		else {

			console.dir(data.tracks.items[0].artists[0].name);
			console.dir(data.tracks.items[0].name);
			console.dir(data.tracks.items[0].preview_url);
			console.dir(data.tracks.items[0].album.name);

		} // end else err

	}); // end of spotify search

} // end of spotifyThisSong function

// if movie-this shows information about the movie selected

function movieThis() {

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

	} // end of for loop

	// OMDB API request 

	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&tomatoes=true';

	request(queryUrl, function (error, response, body) {

	    // If the request is successful 

	    if (!error && response.statusCode == 200) {

	        // Parse the body of the site so that we can pull different keys more easily
	        
	        body = JSON.parse(body);
	        console.log("Title: " + body.Title);
	        console.log("Year: " + body.Year);
	        console.log("IMDB Rating: " + body.imdbRating);
	        console.log("Country: " + body.Country);
	        console.log("Language: " + body.Language);
	        console.log("Plot: " + body.Plot);
	        console.log("Actors: " + body.Actors);
	        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
	        console.log("Rotten Tomatoes URL: " + body.tomatoURL);

	        
	    } // end of if the request is successful
	}); // end of request

} // end of movie-this function

// if do-what-it-says reads the txt file and calls the function associated with it

function doWhatItSays() {

} // end of do-what-it-says function

runApp(action, value);