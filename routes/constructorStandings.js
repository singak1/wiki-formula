const express = require('express');
const router = express.Router();
const { addConstructorStandings, getConstructorStandings, updateConstructorStandings } = require('../controllers/constructorStandingController')
const isAdmin = require('../middleware/isAdmin')

//GET LATEST DRIVERS STANDINGS
router.get('/', getConstructorStandings);

router.use(isAdmin);

//POST DRIVERS STANDINGS
router.post('/', addConstructorStandings);

//UPDATE DRIVERS STANDINGS
router.patch('/:season', updateConstructorStandings);

module.exports = router;