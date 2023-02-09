var mymap3 = L.map("map", {center: [44.13978580325002, -90.49646633748384], zoom: 8});


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhcmxpZWZhdWRlIiwiYSI6ImNsZG5sdzkxazBhc3EzcHB3ZWY1dms2cGUifQ.VHdv2AwIat4FNH8gGvEkGw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap3);

var myIcon1 = L.icon({
    iconUrl: 'icon_6.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});





L.marker([43.83084, -91.24130], {icon: myIcon1}).bindPopup("<b>Menards, La Crosse</b><br>223 Lang Dr<br><i>4.2/5 Stars</i>").addTo(mymap3);

L.marker([42.73568619313967, -90.44120396738576], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Platteville</b><br>1700 Progressive Pkwy<br><i>4.2/5 Stars</i>");

L.marker([42.72496508144495, -88.99730489376518], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Janesville</b><br>2001 Morse St<br><i>4.1/5 Stars</i>");

L.marker([44.95564078055422, -92.72333803178863], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Hudson</b><br>1400 Gateway Blvd<br><i>4.0/5 Stars</i>");

L.marker([45.47049480159697, -91.75385855190925], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Rice Lake</b><br>2920 Decker Dr<br><i>4.0/5 Stars</i>");

L.marker([44.69171016308881, -90.15821565987517], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Marshfield</b><br>2116 N Central Ave<br><i>3.9/5 Stars</i>");

L.marker([44.452096479107055, -89.5267770635806], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Plover</b><br>1901 Plover Rd<br><i>4.0/5 Stars</i>");

L.marker([43.455135017519865, -89.7717727403202], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Baraboo</b><br>1040 WI-136<br><i>4.0/5 Stars</i>");

L.marker([42.56925901477001, -87.89678402205836], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Kenosha</b><br>7330 74th Pl<br><i>4.2/5 Stars</i>");

L.marker([43.0814339889512, -88.76048336492015], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Johnson Creek</b><br>440 Wright Rd<br><i>4.0/5 Stars</i>");

L.marker([44.83117446146533, -91.54744823727913], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Eau Claire</b><br>3210 N. Clairemeont Ave<br><i>4.0/5 Stars</i>");

L.marker([44.781056983408874, -91.43587409232988], {icon: myIcon1})
    .addTo(mymap3)
    .bindPopup("<b>Menards, Eau Claire</b><br>3619 S Hastings Way<br><i>4.1/5 Stars</i>");
