const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// express validator
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route   Get api/profile/me (endpoint)
// @desc    Get current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
		// Profile 모델의 user 필드의 ObjectId와 연결.
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

// @route   Get api/profile/me (endpoint)
// @desc    Create or update user profile
// @access  Private

// need to use Auth and devalidation Middle ware
// router.post('/', (req,res)=> {})
router.post(
	'/',
	[
		auth,
		[check('status', 'Status is required').not().isEmpty(), check('skills', 'Skills is required').not().isEmpty()],
	],
	async (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    }
);
module.exports = router;

// 참고: mongoose populate - [https://www.zerocho.com/category/MongoDB/post/59a66f8372262500184b5363]
