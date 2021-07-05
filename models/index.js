const mongoose = require("../config/connection");
const Cardio = require("./cardio");
const Resistance = require("./resistance");

// const cardioQuickData = {
//     exerciseName: "Cardio",
//     distanceMiles: 10,
//     durationMins: 60
// };

// const resistanceQuickData = {
//     exerciseName: "Cardio",
//     weightLbs: 10,
//     sets: 60,
//     durationMins: 30
// }
  
// Cardio.create(cardioQuickData)
//   .then(dbSample => {
//     console.log(dbSample);
//   })

// Resistance.create(resistanceQuickData)
//   .then(dbSample => {
//     console.log(dbSample);
//   })

module.exports = { Cardio, Resistance }