const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exerciseName: {
        name: String,
        trim: true
    },
    weight: {
        type: Number
    },
    sets: {
        type: Number
    },
    reps: {
        type: Number
    },
    duration: {
        type: Number
    }
});

const resistance = mongoose.model("Resistance", resistanceSchema);

module.exports = resistance;