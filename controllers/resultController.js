const Result = require('../models/raceResultsModel');
const mongoose = require('mongoose');

const getLastResult = async (req, res) => {
    const resl = await Result.find().sort({createdAt: -1}).limit(1);
    try{
        res.status(200).json(resl);
    } catch(error) {
        res.status(400).json({err: error.message});
    }
};

const addResult = async (req, res) => {
    const admin = req.isAdmin.isAdmin
    const { season, round, Results } = req.body;
    console.log(admin);
    if(admin) {
        const resl = Result.create({ season, round, Results });
        try {
            res.status(200).json(resl);
        } catch(error) {
            res.status(400).json({err: error.message});
        }
    } else res.status(401).json({err: "Not enough permissions for current user"})
};

module.exports = { getLastResult, addResult }