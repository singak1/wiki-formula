const mongoose = require('mongoose');
const Schema = mongoose.Schema

const driverStandingSchema = new Schema({
    season: {
        type: String,
        required: true
    },
    round: {
        type: String,
        requred: true
    },
    DriverStandings: {
        type: Array,
        "default": [],
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('DriverStanding', driverStandingSchema);