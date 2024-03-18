const Schdeule = require('../models/raceScheduleModel');
const mongoose = require('mongoose');

const getAllRaces = async (req, res) => {
    const schedule = await Schdeule.find().sort({createdAt: 1});
    try{
        res.status(200).json(schedule);
    } catch(error) {
        res.status(400).json({err: error.message});
    }
};

const getRace = async (req, res) => {
    const querry_round = req.params.round;
    const querry_season = req.params.season;
    const schedule = await Schdeule.findOne({'round' : querry_round, 'season' : querry_season});
    try {
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({err: error.message});
    }
};

const addRace = async (req, res) => {
    const admin = req.isAdmin.isAdmin
    if(admin) {
        const { season, round, raceName, date, time, country, qualiDate, qualiTime, sprintDate, sprintTime } = req.body;
        const schedule = await Schdeule.create({ season, round, raceName, date, time, country, qualiDate, qualiTime, sprintDate, sprintTime })
        try {
            res.status(200).json(schedule);
        } catch(error) {
            res.status(400).json({err: error.message});
        }
    }
    else res.status(401).json({err: "Not enough permissions for current user"})
};

module.exports = { getAllRaces, addRace, getRace }