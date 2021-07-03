const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=d4756b97a46919a0eed174984b925d6c";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to service", undefined);
    } else if (body.cod === 400) {
      callback(
        "Unable to find weather data for the provided location, please try again",
        undefined
      );
    } else {
      callback(
        undefined,
        "It is " +
          body.main.temp +
          " F temperature and it feels like: " +
          body.main.feels_like +
          " F temperature. The overall forecase is " +
          body.weather[0].description
      );
    }
  });
};

module.exports = forecast;
