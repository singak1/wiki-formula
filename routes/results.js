const express = require('express');
const router = express.Router();
const { getLastResult, addResult } = require('../controllers/resultController');
const isAdmin = require('../middleware/isAdmin');

//GET LAST RACE RESULT
router.get('/', getLastResult);

router.use(isAdmin);
//POST MOST RECENT RESULT
router.post('/', addResult);

module.exports = router;