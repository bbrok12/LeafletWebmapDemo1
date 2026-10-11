var map = L.map('earthquakemap').setView([38, -95], 5);
var Stadia_StamenTonerDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeUrl, function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            var magnitude = feature.properties.mag;
            var color = 'green';

            if (magnitude < 1) {
                color = 'green';
                size = 1
            } else if (magnitude < 3) {
                color = 'yellow';
                size = 3
            } else if (magnitude < 5) {
                color = 'orange';
            } else {
                color = 'red';
                size = 10
            }

            return L.circleMarker(latlng, {
                radius: 1 + magnitude*magnitude, // scale the radius based on magnitude
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
                weight: 1
            });
        }
    }).addTo(map);
});