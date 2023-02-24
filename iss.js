//the request functions below have some if statements aimed to handle error events (wrong url or wrong data passed in) without crashing the app but still outputting a helpful message regarding the error. These events are controlled by the callback arguments (check index.js on how these events are hangled within the commented out testing code)
const request = require('request');

//The functiopn informs the IP adress or the oc running this app via API request
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    //the if statment handles unexisting url passed in
    if (error) {return callback(error.message, null)};
    
    //the if statment handles error from the API or a partially incorrect url. (code 200 means successful result)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

//The function takes in an IP adress and returns the coordinates of the given IP adress via API request
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    //the if statment handles unexisting url passed in
    if (error) {return callback(error.message, null)};
    
    //the if statment handles error from the API or a partially incorrect url. (code 200 means successful result)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    const data = JSON.parse(body);
    const coordinates = {latitude: data.latitude, longitude: data.longitude};

    //The if statment handles an error where an incorrect ip adress is passed in
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(message, null);
      return;
    } else {
      return callback(null, coordinates);
    }
    
  });
};

//The function takes in coordinates and returns the time th ISS will fly over those coordinates via API request
const fetchISSFlyOverTimes = function(coordinates, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    
    if (error) {
      return callback(error.message, null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    const nextPasses = JSON.parse(body).response;
    return callback(null, nextPasses);
  });
};

//this function loops through all of the items and logs the next time the ISS will pass overhead
const printPassTimes = function(PassTimes){
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

//The function runs all API requests above
const nextISSTimesForMyLocation = function(callback){
  //fetchMyIP will either return an error or an IP address.
  fetchMyIP((error, ip) => {
    //If an error is returned it will trigger the return event, meaning that all code after the return will not run
    if(error){
      return callback(error, null)
    }

    //if the IP is returned, and the error not triggered, the function below will run. However sinse the function below is inside fetchMyIP the arument 'ip' will receive the ip value (note that this argument's name has to be exactly the same as the argument in fetchMyIP, because stored in the fetchMyIP(ip) is the IP adress
    fetchCoordsByIP(ip, (error, coordinates) => {
      if(error){
        return callback(error, null)
      }

      //here the same happens as above; coordinates is storing a value returned from fetchCoordsByIP. it can only be accessed this way because the function below is inside fetchCoordsByIP.
      fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
        if(error){
          return callback(error, null)
        }

        callback(null, nextPasses)
      })
    })
  })
}

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};