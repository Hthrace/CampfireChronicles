//Using the US Census API for geocoding https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html
const axios = require("axios");

module.exports.geocode = async (st, city, state) => {
  const street = st.split(" ").join("+");

  const response = await axios.get(
    `https://geocoding.geo.census.gov/geocoder/locations/address?street=${street}&city=${city}&state=${state}&benchmark=2020&format=json`
  );

  if (response.data.result.addressMatches.length >= 1) {
    const { x, y } = response.data.result.addressMatches[0].coordinates;
    return { type: "Point", coordinates: [x, y] };
  } else {
    return { type: "Point", coordinates: [-0, 0] };
  }
};
