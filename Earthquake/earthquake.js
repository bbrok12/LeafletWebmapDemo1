var map = L.map('earthquakemap').setView([38, -95], 5);
var Stadia_StamenTonerDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
// ...existing code...
$.getJSON(earthquakeUrl, function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            var mag = feature.properties.mag || 0;
            var alertColor = 'green';

            if (mag >= 5) {
                alertColor = 'red';
            } else if (mag >= 4) {
                alertColor = 'purple';
            } else if (mag >= 3) {
                alertColor = 'yellow';
            }

            return L.circleMarker(latlng, {
                radius: mag * 2,
                fillColor: alertColor,
                color: alertColor,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6

            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                "<h3>" + feature.properties.title + "</h3>" +
                "<strong>Magnitude:</strong> " + feature.properties.mag +
                "<br><strong>Location:</strong> " + feature.properties.place +
                "<br><strong>Time:</strong> " + new Date(feature.properties.time).toLocaleString()
            );
        }
    }).addTo(map);
})