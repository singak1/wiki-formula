const mongoose = require('mongoose');
const Schema = mongoose.Schema

const constructorStandingSchema = new Schema({
    season: {
        type: String,
        required: true
    },
    round: {
        type: String,
        requred: true
    },
    ConstructorStandings: {
        type: Array,
        "default": [],
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('ConstructorStanding', constructorStandingSchema);