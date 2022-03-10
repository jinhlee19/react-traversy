const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');

const auth = require('../../middleware/auth');
const Users = require('../../models/Users');
const post = require('../../models/Post');
const profile = require('../../models/Profile');
const user = require('../../models/Users');

// @route   Post api/posts
// @desc    Test Route
// @access  Public

router.post('/', [auth], [check('text', 'Text is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ error: errors.array() });
	}
	try {
		const user = await User.findById(req.user.id).select('-password');

		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			//여긴 왜 req.일까 -> 테스트 해보기
			user: req.user.id,
		});
		const post = await newPost.save();
		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
