const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceScheduleSchema = new Schema({
    season: {
        type: String,
        required: true
    },
    round: {
        type: String,
        required: true
    },
    raceName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    qualiDate: {
        type: String,
        required: true
    },
    qualiTime: {
        type: String,
        required: true
    },
    sprintDate: {
        type: String,
        required: false
    },
    sprintTime: {
        type: String,
        required: false
    },
}, {timestamps : true})

module.exports = mongoose.model('Race', raceScheduleSchema);