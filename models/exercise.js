const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    }
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;