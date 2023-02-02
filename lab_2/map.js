var mymap = L.map("map").setView([44.975382, -93.233786], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhcmxpZWZhdWRlIiwiYSI6ImNsZG5sdzkxazBhc3EzcHB3ZWY1dms2cGUifQ.VHdv2AwIat4FNH8gGvEkGw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

L.marker([44.975382, -93.233786])
    .addTo(mymap)
    .bindPopup("<b>Hello!</b><br><i>Welcome to the University of Minnesota.</i>")
    .openPopup();