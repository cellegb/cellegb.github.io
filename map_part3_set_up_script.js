var ourLoc;
var view;
var map;
var fr;

function init() {
	// Initalize things here
	ourLoc = ol.proj.fromLonLat([42.9103, 3.0282]);
	fr = ol.proj.fromLonLat([37.0902, 95.7129]);

	view = new ol.View({
		center: ourLoc,
		zoom: 6
	});

	map = new ol.Map({
		target: 'map',
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM()
		  })
		],

		loadTilesWhileAnimating: true,
		view: view
	});
}

function panHome() {
	view.animate({
		center: ourLoc, // "Home" Location
		duration: 2000  // Two seconds
	});
}

function france() {
	view.animate({
		center: fr, // france location
		duration: 2000  // Two seconds
	});
}

function makeCountryRequest() {
	var countryName = document.getElementById("country-name").value;

	if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}

	var query = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true"

	query = query.replace(/ /g, "%20")

	var countryRequest = new XMLHttpRequest();
	countryRequest.open('GET', query, false);

	countryRequest.send();

	if(countryRequest.readyState != 4 || countryRequest.status != 200 || countryRequest.responseText === "") {
	 	window.console.error("Request had an error!");
	 	return;
	}

	var countryInformation = JSON.parse(countryRequest.responseText);

	var lat = countryInformation[0].latlng[0];
	var lon = countryInformation[0].latlng[1];

	window.console.log(countryName + ": lon " + lon + " & lat " + lat);

	var location = ol.proj.fromLonLat([lon, lat]);


	view.animate({
		center: location, // Location
		duration: 2000  // Two seconds
	});
}

window.onload = init;
