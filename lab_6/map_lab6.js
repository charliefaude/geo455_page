//Create the map variable

var mymap = L.map('map', {
    center: [51.48882027639122, -0.1028811094342392], 
    zoom: 11 });

 L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
   attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
   maxZoom: 11,
   minZoom: 5
 }).addTo(mymap);

//Set up the baselayers


var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v12',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);






// assign colors and add script data for population density

function getColor(value) {
    return value > 139 ? '#006837':
           value > 87  ? '#31a354':
           value > 53  ? '#78c679':
           value > 32  ? '#c2e699':
                         '#ffffcc';
}

function style(feature){
    return {
        fillColor: getColor(feature.properties.pop_den),   
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
}

// 

function highlightFeature(e) {
    // Get access to the feature that was hovered through e.target
    var feature = e.target;

    // Set a thick grey border on the feature as mouseover effect
    // Adjust the values below to change the highlighting styles of features on mouseover
    // Check out https://leafletjs.com/reference-1.3.4.html#path for more options for changing style
    feature.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });

    // Bring the highlighted feature to front so that the border doesn’t clash with nearby states
    // But not for IE, Opera or Edge, since they have problems doing bringToFront on mouseover
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature, // Do what defined by the highlightFeature function on mouseover
        mouseout: resetHighlight,    // Do what defined by the resetHighlight function on mouseout
    });
}

var geojson; // define a variable to make the geojson layer accessible for the function to use   
            
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

geojson = L.geoJson(data, {
    style:style,
    onEachFeature: onEachFeature
}).bindPopup(function (layer){
    return layer.feature.properties.pop_den
        + '<p style="color:purple">' + layer.feature.properties.pop_den.toString() + 'People/Hectare </p>';
}).addTo(mymap); 



// create second feature (PARTIALLY ENGLISH SPEAKING HOUSEHOLDS)

// assign colors and add script data 

function getColor1(value) {
    return value > 5.360425  ? '#08519c':
           value > 3.379878  ? '#3182bd':
           value > 1.976896  ? '#6baed6':
           value > 0.905532  ? '#bdd7e7':
                               '#eff3ff';
}

function style(feature){
    return {
        fillColor: getColor1(feature.properties.partial),   
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
}

// 

function highlightFeature(e1) {
    var feature1 = e1.target;

    feature1.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature1.bringToFront();
    }
}

function onEachFeature(feature1, layer) {
    layer.on({
        mouseover: highlightFeature, 
        mouseout: resetHighlight,    
    });
}

var geojson1; 
            
function resetHighlight(e1) {
    geojson1.resetStyle(e1.target);
}

geojson1 = L.geoJson(partial, {
    style:style,
    onEachFeature: onEachFeature
}).bindPopup(function (layer){
    return layer.feature1.properties.partial
        + '<p style="color:purple">' + layer.feature1.properties.partial.toString() + 'English Speaking/Hectare </p>';
}).addTo(mymap); 


// CREATE LEGEND 

var legend = L.control({position: 'bottomright'}); 

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 32, 53, 87, 132];
    

    div.innerHTML = '<b>Density Per Square Unit Areas <br></b>'; 

    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i>' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);

// CREATE LEGEND 1

var legend1 = L.control({position: 'bottomleft'}); 

legend1.onAdd = function (mymap) {

    var div1 = L.DomUtil.create('div', 'legend'),
        grades = [0, 0.905532, 1.976896, 3.379878, 5.360425];

    div1.innerHTML = '<b>Partially English Speaking Households <br></b>'; 

    
    for (var i = 0; i < grades.length; i++) {
        div1.innerHTML +=
        '<i style="background:' + getColor1(grades[i] + 1) + '"></i>' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div1;
};

legend1.addTo(mymap);


// Create menu items


var baseLayers = {
    'Grayscale': grayscale,
    'StreetMap': streets,
    };

var overlays = {
    'Partial English': geojson1,
    'Population Density': geojson,
};

//Create menu
 

var layerControl = L.control.layers(baseLayers, overlays, {collapsed: false}).addTo(mymap);


