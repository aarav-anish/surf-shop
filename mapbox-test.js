require('dotenv').config();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

const rgeocoder = async (coordinates) => {
  try {
    let response = await geocodingClient
      .reverseGeocode({
        query: coordinates,
        limit: 1,
      })
      .send();
  } catch (e) {
    console.log(e);
  }
};

const fgeocoder = async (location) => {
  try {
    let response = await geocodingClient
      .forwardGeocode({
        query: location,
        limit: 1,
      })
      .send();

    rgeocoder(response.body.features[0].geometry.coordinates);
  } catch (e) {
    console.log(e);
  }
};

fgeocoder('Dhanbad, India');
