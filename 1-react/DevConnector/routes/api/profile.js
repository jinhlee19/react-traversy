const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// express validator
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route   Get api/profile/me
// @desc    Get current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user_id }).populate('user', ['name', 'avatar']);
		// Profile 모델의 user 필드의 ObjectId와 연결.
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   Post api/profile
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
		const errors = validationResult(req);
		// validation not pass
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//validation passes
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		// Build Profile Object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		// array type
		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}
		// Build social object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		// * mongoose 메서드 사용시 항상 앞에 await 사용
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				// Update
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
				return res.json(profile);
			}
			// Create
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
	}
);

// @route   Get api/profile/
// @desc    Get all profiles
// @access  Public

router.get('/', async (req,res)=>{
	try {
		const profiles = await Profile.find().populate('user', ['name','avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   Get api/profile/user/:user_id
// @desc    Get profiles by user ID
// @access  Public

router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if(err.kind == 'ObjectId'){
			return res.status(400).json({ msg: 'Profile not Found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/profile/
// @desc    Delete profiles, user & posts
// @access  Private

router.delete('/', auth, async (req,res)=>{
	try {
		// @todo - remove users posts
		
		// Remove Profile
		await Profile.findOneAndRemove({user: req.user.id});
		// since its private we need to access to the token, which we actually have to add in here the auth middleware.

		// Remove User
		await User.findOneAndRemove({_id: req.user.id});
		res.json({msg: 'User deleted.'});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
