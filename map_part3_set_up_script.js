var ourLoc;
var view;
var map;
var cd;
var fr;
var sp;
var it;
var gr;
var uk;
var ch;
var jp;


function init() {
	// Initalize things here
	ourLoc = ol.proj.fromLonLat([276.6298, 41.8781]);
  cd = ol.proj.fromLonLat([250.6298, 55.5017]);
  fr = ol.proj.fromLonLat([2.2137, 46.2276]);
  sp = ol.proj.fromLonLat([3.7492, 40.4637]);
  it = ol.proj.fromLonLat([12.4964, 41.9028]);
  gr = ol.proj.fromLonLat([24.8093, 35.2401]);
  uk = ol.proj.fromLonLat([0.1278, 51.5074]);
  ch = ol.proj.fromLonLat([121.4737, 31.2304]);
  jp = ol.proj.fromLonLat([139.6503, 35.6762]);

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

function canada(){
  view.animate({
		center: cd, // "Home" Location
		duration: 2000  // Two seconds
	});
}

function france(){
  view.animate({
		center: fr, // "Home" Location
		duration: 2000  // Two seconds
  });
}

function spain(){
  view.animate({
		center: sp, // "Home" Location
		duration: 2000  // Two seconds
  });
}

function italy(){
  view.animate({
		center: it, // "Home" Location
		duration: 2000  // Two seconds
	});
}

function crete(){
  view.animate({
		center: gr, // "Home" Location
		duration: 2000  // Two seconds
	});
}

function unitedk(){
  view.animate({
		center: uk, // "Home" Location
		duration: 2000  // Two seconds
	});
}

function china(){
  view.animate({
		center: ch, // "Home" Location
		duration: 2000  // Two seconds
  });
}

function japan(){
  view.animate({
		center: jp, // "Home" Location
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
