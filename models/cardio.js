const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardioSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exerciseName: {
        name: String
    },
    distanceMiles: {
        type: Number
    },
    durationMins: {
        type: Number
    }
});

const Cardio = mongoose.model("Cardio", cardioSchema, "Cardio");

module.exports = Cardio;