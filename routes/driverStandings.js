const express = require('express');
const router = express.Router();
const { addDriverStandings, updateDriverStandings, getDriverStandings } = require('../controllers/driverStandingController')
const isAdmin = require('../middleware/isAdmin')

//GET LATEST DRIVERS STANDINGS
router.get('/', getDriverStandings);

router.use(isAdmin);

//POST DRIVERS STANDINGS
router.post('/', addDriverStandings);

//UPDATE DRIVERS STANDINGS
router.patch('/:season', updateDriverStandings);

module.exports = router;