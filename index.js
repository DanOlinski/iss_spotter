//const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//     //return ip
//   return console.log('It worked! Returned IP:' , ip); //75.159.93.227
// });

// fetchCoordsByIP('75.159.93.227', (error, data) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }

//   return console.log('It worked! Returned:' , data); // latitude: 51.0486151, longitude: -114.0708459
// });

// const coords =  {latitude: 51.0486151, longitude: -114.0708459};
// fetchISSFlyOverTimes(coords, (error, data) => {
  
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
  
//   return console.log('It worked! Returned:' , data);
// });