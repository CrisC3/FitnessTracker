const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exerciseName: {
        name: String
    },
    weightLbs: {
        type: Number
    },
    sets: {
        type: Number
    },
    reps: {
        type: Number
    },
    durationMins: {
        type: Number
    }
});

const Resistance = mongoose.model("Resistance", resistanceSchema, "Resistance");

module.exports = Resistance;