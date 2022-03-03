const express = require('express');
const router = express.Router();
// middleware - 경로.. outside of api, routes, ...
const auth = require('../../middleware/auth');

// @route   Get API/ Auth
// @desc    Test Route
// @access  Public

// middleware 사용시 second param 'auth,'추가
router.get('/', auth, (req, res) => res.send('Auth Route'));

// 라우터를 모듈로 만듬. export
module.exports = router;
