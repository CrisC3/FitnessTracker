const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardioSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exerciseName: {
        name: String,
        trim: true
    },
    distanceMiles: {
        type: Number
    },
    durationMins: {
        type: Number
    }
});

const cardio = mongoose.model("Cardio", cardioSchema);

module.exports = cardio;