mapboxgl.accessToken =
  'pk.eyJ1IjoiYWFyYXYtYW5pc2giLCJhIjoiY2tzeXgzaGJ5Mmd6aTJwcG53eGwwNjdnOCJ9.nWIPFT3f0f1G_7IWJ9By1A';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: post.coordinates, // starting position [lng, lat]
  zoom: 5, // starting zoom
});

// create a HTML element for post location/marker
const el = document.createElement('div');
el.className = 'marker';

// make a marker for location and add to the map
new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(`<h3>${post.title}</h3><p>${post.location}</p>`),
  )
  .addTo(map);
