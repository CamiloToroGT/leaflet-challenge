// Creating the map object
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Getting our GeoJSON data
d3.json(link).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  // style, color, radius functions


  function mapStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: mapColor(feature.properties.mag),
      color: "Black",
      radius: mapRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  

}

  function mapColor(depth) {
    if (depth > 5) {
      return "red";
  }
  else if (depth > 4) {
      return "orangered";
  }
  else if (depth > 3) {
      return "orange";
  }
  else if (depth > 2) {
      return "gold";
  }
  else if (depth > 1) {
      return "yellow";
  }
  else {
      return "lightgreen";
  }
}
// Define magnitude size
  function mapRadius(mag) {
    return mag * 3;
  }

// pointToLayer: ,// function to change markers to circles
// style: ,//stylefunction
// onEachFeature: //create popups
L.geoJson(data, {

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },

    style: mapStyle,

  // Activate pop-up data when circles are clicked
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);

    }


    
  }).addTo(myMap);


  // Set up the legend.
  var legend = L.control({ 
    position: 'bottomright' 
  });

  // When the layer control is added, insert a div with the class of "info legend".
  legend.onAdd = function() {

    var div = L.DomUtil.create('div', 'info legend'),
        depth = [0, 1, 2, 3, 4, 5];

    // loop through 
    for (var i = 0; i < depth.length; i++) {
      div.innerHTML +=
        '<i style="background:' + mapColor(depth[i] + 1) + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }

    return div;
  };

  // Add the info legend to the map.
  legend.addTo(myMap);







});


    




