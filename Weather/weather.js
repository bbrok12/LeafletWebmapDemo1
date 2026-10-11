var map = L.map('weathermap').setView([38, -95], 5);
var Stadia_StamenTonerDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);
// removed orignal web map and replaced with Stamen Toner Dark basemap
// var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// var basemap =  L.tileLayer(basemapUrl, {attribution: '&copy; <a href="http://' + 'www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);


//add the national precipitation radar layer
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//add alerts layer
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
    //L.geoJSON(data).addTo(map);
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') {
                alertColor = 'red';
            } else if (feature.properties.severity === 'Extreme') {
                alertColor = 'purple';
            } else if (feature.properties.severity === 'Minor') {
                alertColor = 'yellow';
            }
            return { color: alertColor };
          },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.headline);
                
            }
          
      }).addTo(map);
      
});