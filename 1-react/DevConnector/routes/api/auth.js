const express = require('express');
const router = express.Router();
// middleware - 경로.. outside of api, routes, ...
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');

// #2 USER AUTHENTICATION / LOGIN ROUTE
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

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

// #2 USER AUTHENTICATION / LOGIN ROUTE

// @route   Post API/ Auth
// @desc    Authenicate user and Get token
// @access  Public

router.post(
	'/',
	[
		check('email', 'please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			// See if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}
            
            const payload = {
				user: {
					id: user.id,
				}
			};
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
