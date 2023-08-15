const DriverStanding = require('../models/driverStandingsModel');
const mongoose = require('mongoose');

const addDriverStandings = async (req, res) => {
    const admin = req.isAdmin.isAdmin
    if(admin) {
        const {season, round, DriverStandings} = req.body;
        const resl = await DriverStanding.create({ season, round, DriverStandings });
        try {
            res.status(200).json(resl);
        } catch(error) {
            res.status(400).json({err: error.message});
        }
    }
    else res.status(401).json({err: "Not sufficient permissions for user"})
};

const updateDriverStandings = async (req, res) => {
    const admin = req.isAdmin.isAdmin
    if(admin) {
        const querry_season = req.params.season;
        const resl = await DriverStanding.findOneAndUpdate({'season' : querry_season}, {...req.body})
        try {
            res.status(200).json(resl);
        } catch(error) {
            res.status(400).json({err: error.message});
        }
    }
    else res.status(401).json({err: "Not sufficient permissions for user"})
};

const getDriverStandings = async (req, res) => {
    const standing = await DriverStanding.find().sort({updatedAt : -1}).limit(1)
    try{
        res.status(200).json(standing);
    } catch(err) {
        res.status(400).json({err: error.message});
    }
};

module.exports = {addDriverStandings, updateDriverStandings, getDriverStandings}