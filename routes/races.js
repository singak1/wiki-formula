const express = require('express');
const router = express.Router();
const { getAllRaces, addRace, getRace } = require('../controllers/scheduleController')
const isAdmin = require('../middleware/isAdmin')

//GET CURRENT SEASON
router.get('/', getAllRaces);

//GET SPECIFIC RACE
router.get('/:round/:season', getRace);

router.use(isAdmin);
//POST UPCOMING SEASON !!ONLY ACCESSIBLE TO ADMIN/MOD USERS
router.post('/', addRace);

module.exports = router;