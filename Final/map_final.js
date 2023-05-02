//Create Map Variable
var mymap = L.map("map", {
    center: [38.85250119246977, -99.60815961021089],
              zoom: 5,
});

//Add Baselayers
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var darkv11 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhcmxpZWZhdWRlIiwiYSI6ImNsZG5sdzkxazBhc3EzcHB3ZWY1dms2cGUifQ.VHdv2AwIat4FNH8gGvEkGw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	maxZoom: 13
});


// Create Future Scores layer (from Arc Online)
var futureScores = L.esri.tiledMapLayer({
    url:'https://tiles.arcgis.com/tiles/uRm5PFNUDV7pDKUv/arcgis/rest/services/H_Verticillata_Future_Climatch_Scores/MapServer',
    // server response content type can be either 'json' (default) or 'image'
    f: 'image'
  });

// Create Current Scores layer (from Arc Online)
var currentScores = L.esri.tiledMapLayer({
    url: 'https://tiles.arcgis.com/tiles/uRm5PFNUDV7pDKUv/arcgis/rest/services/H_Verticillata_Current_Climatch_Scores/MapServer',
    // server response content type can be either 'json' (default) or 'image'
    f: 'image'
  }).addTo(mymap);

//Create HUC 2 layer (from Arc Online)
var huc2 = L.esri.featureLayer({ url:'https://services3.arcgis.com/uRm5PFNUDV7pDKUv/arcgis/rest/services/HUC2/FeatureServer/0', style: () => {
            return {
              color: "#e2afed",
              dashArray: "2, 3",
              dashOffset: "2",
              weight: "2"
            }
          },
            onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 200};
                layer.bindPopup("<b>HUC2:</b> " + feature.properties.REG
                    ,popupOptions);
            }
  });


//Create Major Rivers Layer

var rivers = L.esri.featureLayer({
    url: 'https://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/US_Major_Rivers/FeatureServer/0', style: () => {
            return {
              color: "#0283de",
              dashOffset: "2",
              weight: "2"
            }
          },
            onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 200};
                layer.bindPopup("<b>River Name:</b> " + feature.properties.PNAME
                    ,popupOptions);
            }
  });



//Create LEGEND for rasters (climatch scores)

function getColor(value) {
    return value > 10 ? '#ff0000':
           value > 8 ? '#ff7100':
           value > 6  ? '#ffe300':
           value > 4  ? '#b0e200':
           value > 2  ? '#5abc00':
                       '#38a800';
}
var legend = L.control({position: 'bottomright'}); 

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 2, 4, 6, 8, 10];
    

    div.innerHTML = '<b>Climatch Score <br></b>'; 

    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i>' +
        grades[i] + (grades[i + 1] ?  '<br>' : ' ');
    }

    return div;
};

legend.addTo(mymap); 

//Cluster Map
var clustermarkers = L.markerClusterGroup();
hydrilla_reported_points_Fea.features.forEach(function(feature) {
    clustermarkers.addLayer(L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]));
})

mymap.addLayer(clustermarkers);

// Create menu items


var baseLayers = {
    'Grayscale': grayscale,
    'StreetMap': streets,
    'Dark': darkv11,
    'Shaded Relief': Esri_WorldShadedRelief,
    };

var overlays = {
    'Future Climate Match Scores': futureScores, 
    'Current Climate Match Scores': currentScores,
    '2 Digit Hydrolic Unit Codes (HUC 2)': huc2,
    'Major US Rivers': rivers,
    'Hydrilla Reported': clustermarkers,
    };


//Create menu
 

var layerControl = L.control.layers(baseLayers, overlays, {collapsed: false}).addTo(mymap);




