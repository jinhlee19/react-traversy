const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   Get API/ Posts
// @desc    Test Route
// @access  Public

router.get('/', (req, res) => res.send('Posts Route'));

module.exports = router;

