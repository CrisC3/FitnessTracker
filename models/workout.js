const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            _id : false,
            type: { type: String },
            name: { type: String },
            duration: { type: Number },
            weight: { type: Number },
            reps: { type: Number },
            sets: { type: Number },
            distance: { type: Number }
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema, "Workout");

module.exports = Workout;