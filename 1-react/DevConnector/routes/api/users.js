const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// router.get('/')이면 / 주소로 [ GET요청 ]을 하는 것과 같다.
// 이때, '/'는 server.js의 'api/users'에 해당된다.
const User = require('../../models/Users');

// @route   Post api/users
// @desc    Register user ***
// @access  Public

router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
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
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] }); // bad q
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
				},
			};
			// 3600 = 1hr
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					//else?
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;

/*
1. need to send data to the route
- name, email, pw to register
- {}로 분리
- console.log로 req.body
- req.body를 실행하기 위해서 initialize middle-ware해야함
*/
