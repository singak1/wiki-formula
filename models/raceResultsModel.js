const mongoose = require('mongoose');
const Schema = mongoose.Schema

const raceResultSchema = new Schema({
    season: {
        type: String,
        required: true
    },
    round: {
        type: String,
        requred: true
    },
    Results: {
        type: Array,
        "default": [],
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Result', raceResultSchema);