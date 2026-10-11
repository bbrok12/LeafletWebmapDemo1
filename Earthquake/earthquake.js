var map = L.map('earthquakemap').setView([38, -95], 5);
var Stadia_StamenTonerDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

function getColor(mag) {
    if (mag >= 5) return 'red';
    if (mag >= 4) return 'orange';
    if (mag >= 3) return 'yellow';
    return 'green';
}

$.getJSON(earthquakeUrl, function(data) {
    var earthquakeLayer = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            var mag = feature.properties.mag || 0;
            var alertColor = getColor(mag);

            return L.circleMarker(latlng, {
                radius: Math.max(4, mag * 2),
                fillColor: alertColor,
                color: alertColor,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                '<h3>' + feature.properties.title + '</h3>' +
                '<strong>Magnitude:</strong> ' + feature.properties.mag +
                '<br><strong>Location:</strong> ' + feature.properties.place +
                '<br><strong>Time:</strong> ' + new Date(feature.properties.time).toLocaleString()
            );
        }
    }).addTo(map);

    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [
            { label: '0-2.9', color: 'green' },
            { label: '3.0-3.9', color: 'yellow' },
            { label: '4.0-4.9', color: 'orange' },
            { label: '5.0+', color: 'red' }
        ];

        div.innerHTML = '<h4>Magnitude</h4>';

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + grades[i].color + '; width: 14px; height: 14px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> ' +
                grades[i].label + '<br>';
        }

        return div;
    };

    legend.addTo(map);
});


