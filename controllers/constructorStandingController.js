const ConstructorStanding = require('../models/constructorStandingsModel')
const mongoose = require('mongoose')

const addConstructorStandings = async (req, res) => {
    const admin = req.isAdmin.isAdmin
    if(admin) {
        const {season, round, ConstructorStandings} = req.body;
        const resl = await ConstructorStanding.create({ season, round, ConstructorStandings });
        try {
            res.status(200).json(resl);
        } catch(error) {
            res.status(400).json({err: error.message});
        }
    }
    else res.status(401).json({err: "Not sufficient permissions for user"})
};

const updateConstructorStandings = async (req, res) => {
    const admin = req.isAdmin.isAdmin
    if(admin) {
        const querry_season = req.params.season;
        const resl = await ConstructorStanding.findOneAndUpdate({'season' : querry_season}, {...req.body})
        try {
            res.status(200).json(resl);
        } catch(error) {
            res.status(400).json({err: error.message});
        }
    }
    else res.status(401).json({err: "Not sufficient permissions for user"})
};

const getConstructorStandings = async (req, res) => {
    const standing = await ConstructorStanding.find().sort({updatedAt : -1}).limit(1)
    try{
        res.status(200).json(standing);
    } catch(err) {
        res.status(400).json({err: error.message});
    }
};

module.exports = {addConstructorStandings, updateConstructorStandings, getConstructorStandings}