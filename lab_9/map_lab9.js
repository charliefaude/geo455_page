var mymap = L.map("map", {
    center: [43.0186, -89.5498],
              zoom: 8,
});

/*var mymap = L.map('map').setView([38.85250119246977, -99.60815961021089], 4);
        L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw')
        .addTo(mymap);*/
        
var grayscale = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
   attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
   maxZoom: 11,
   minZoom: 2
 }).addTo(mymap);

var counties = L.geoJson(counties, {
    style: function (feature) {
        return {fillOpacity: 0.5, weight: 2, color: feature.properties.color};
    }, 
    onEachFeature: function(feature, featureLayer) {
        featureLayer.bindTooltip(feature.properties.NAME, {permanent: false, direction: 'right'});
    }
}).addTo(mymap);

var migrationLayer = L.migrationLayer({
    map: mymap,
    data: dane_data,
    pulseRadius:30,
    pulseBorderWidth:3,
    arcWidth:1,
    arcLabel:true,
    arcLabelFont:'10px sans-serif',
    maxWidth:10
    });

migrationLayer.addTo(mymap);




function hide(){
    migrationLayer.hide();
}
function show(){
    migrationLayer.show();
}
function play(){
    migrationLayer.play();
}
function pause(){
    migrationLayer.pause();
}