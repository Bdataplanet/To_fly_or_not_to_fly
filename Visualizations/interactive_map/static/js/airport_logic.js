// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the third tile layer that will be the background of our map.
let navigation = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [40.7, -94.5],
    zoom: 3,
    layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Navigation": navigation
};

// 1. Add a 2nd layer group for the airport data.
let airports = new L.LayerGroup();

// Airport data file
const airportSource = "origin_airports.geojson"

// This function returns the style data for each of the airports we plot on
// the map.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: .7,
        fillColor: "#960cbd",
        color: "#000000",
        radius: getRadius(feature.properties.cancelled_sum),
        stroke: true,
        weight: 0.5
    };
}

// This function determines the radius of the airport marker based on its number of cancellations.
function getRadius(cancellations) {
    if (cancellations < 44.4444444) {
        return 2;
    }
    return .3*Math.sqrt(cancellations);
}

// Retrieve the airport GeoJSON data.
d3.json(airportSource).then(function(data) {
    
      // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
        // We create a popup for each circleMarker to display the airport and number of the cancellations
        //  after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Airport: " + feature.properties.origin_airport + "<br>Number of Cancellations: " + feature.properties.cancelled_sum);
        }
    }).addTo(airports);
    
    // Then we add the airport layer to our map.
    airports.addTo(map);
});