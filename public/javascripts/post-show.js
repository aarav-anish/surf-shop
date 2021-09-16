/*
 *
 *
 * 
  Tutorial followed for displaying map: 
  https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
 *
 *
 * 
 */

mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: post.geometry.coordinates, // starting position [lng, lat]
  zoom: 5, // starting zoom
});

// create a HTML element for post location/marker
const el = document.createElement('div');
el.className = 'marker';

// make a marker for location and add to the map
new mapboxgl.Marker(el)
  .setLngLat(post.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(`<strong>${post.title}</strong><p>${post.location}</p>`),
  )
  .addTo(map);

// toggle edit review
$('.toggle-edit-form').on('click', function () {
  if ($(this).text() === 'Edit') {
    $(this).text('Cancel').removeClass('btn-warning').addClass('btn-secondary');
  } else {
    $(this).text('Edit').removeClass('btn-secondary').addClass('btn-warning');
  }
  $(this).siblings('.edit-review-form').toggle();
});

// Add click listener for clearing of rating from edit/new form
$('.clear-rating').click(function () {
  $(this).siblings('.input-no-rate').click();
});
