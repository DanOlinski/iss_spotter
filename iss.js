const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body).ip;
    return callback(null, data);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error.message, null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    const data = JSON.parse(body);
    const coordinates = {latitude: data.latitude, longitude: data.longitude};

    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(message, null);
      return;
    } else {
      return callback(null, coordinates);
    }
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      return callback(error.message, null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    const data = JSON.parse(body).response;
    return callback(null, data);
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};