//This app identifies the IP adress and coordinates of the PC running this app, the informs the times the ISS will fly overhead. The code that is commented out below is used to test the functions individually
const {nextISSTimesForMyLocation} = require('./iss');

//const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//     //return ip
//   return console.log('It worked! Returned IP:' , ip); //75.159.93.227
// });

// fetchCoordsByIP('75.159.93.227', (error, coordinates) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }

//   return console.log('It worked! Returned:' , coordinates); // latitude: 51.0486151, longitude: -114.0708459
// });

// const coords =  {latitude: 51.0486151, longitude: -114.0708459};
// fetchISSFlyOverTimes(coords, (error, nextPasses) => {
  
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
  
//   return console.log('It worked! Returned:' , nextPasses);
// });


//this function loops through all of the items and logs the next time the ISS will pass overhead
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

//this function runs the entire app
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});