const express = require('express');
const router = express.Router();
// middleware - 경로.. outside of api, routes, ...
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
// @route   Get API/ Auth
// @desc    Test Route
// @access  Public

// 항상 middleware 사용시에는 second param으로 'auth,'추가해야한다고함. -> route를 protect
// router.get('/', (req, res) => res.send('Auth Route')); 
// postman으로 테스팅해보면  api.auth 
// router.get('/', auth, (req, res) => res.send('Auth Route'));
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// 라우터를 모듈로 만듬. export
module.exports = router;
