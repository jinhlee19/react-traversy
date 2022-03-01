const express = require('express');
const router = express.Router();

// @route   Get API/ Users
// @desc    Test Route
// @access  Public

// router.get('/')이면 / 주소로 [ GET요청 ]을 하는 것과 같다.
// 이때, '/'는 server.js의 'api/users'에 해당된다. 
router.get('/', (req, res) => res.send('User Route'));

module.exports = router;
