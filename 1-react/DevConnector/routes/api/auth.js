const express = require('express');
const router = express.Router();
// middleware - 경로.. outside of api, routes, ...
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
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
	],
	async (req, res) => {
		// console.log(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// 나중에 프론트에서 에러메세지를 사용할 수 있다.
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		//// 여기는 instead of req.body.name -> destructure
		try {
			// See if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}
			// Get users Gravatar
			const avatar = gravatar.url(email, {
				// default size
				s: '200',
				r: 'pg',
				// default image
				d: 'mm',
			});
			user = new User({
				name,
				email,
				avatar,
				password,
			});

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// Return jsonwebtoken
			// res.send('User Registered.');
			// payload - object - user:id
			// mongodb의 _id -> mongoose에서 .id로 잡힌다
			const payload = {
				user: {
					id: user.id,
				}
			};
			// 3600 = 1hr
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				//else?
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// 라우터를 모듈로 만듬. export
module.exports = router;
