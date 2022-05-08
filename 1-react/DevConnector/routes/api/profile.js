const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const request = require('request');
const config = require('config');

// express validator
const { body, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route   Get api/profile/me
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
	[auth, body('status', 'Status is required').not().isEmpty(), body('skills', 'Skills is required').not().isEmpty()],
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
		// try {
		// 	let profile = await Profile.findOne({ user: req.user.id });
		// 	if (profile) {
		// 		// Update
		// 		profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
		// 		return res.json(profile);
		// 	}
		// 	// Create
		// 	profile = new Profile(profileFields);
		// 	await profile.save();
		// 	res.json(profile);
		// }
		try {
			// Using upsert option (creates new doc if no match is found):
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true, setDefaultsOnInsert: true }
			);
			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
	}
);

// @route   Get api/profile/
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
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
		const profile = await Profile.findOne({
			user: req.params.user.id,
		}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not Found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/profile/
// @desc    Delete profiles, user & posts
// @access  Private

router.delete('/', auth, async (req, res) => {
	try {
		// @todo - remove users posts

		// Remove Profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove User
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User deleted.' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// ADD PROFILE EXPERIENCE
// @route   PUT api/profile/experience
// @desc    Add profiles, user & posts
// @access  Private

router.put(
	'/experience',
	[
		auth,
		[
			body('title', 'Title is required').not().isEmpty(),
			body('company', 'Company is required').not().isEmpty(),
			body('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: error.array() });
		}
		const { title, company, location, from, to, current, description } = req.body;
		const newExp = { title, company, location, from, to, current, description };
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			// 배열 맨 앞에 추가
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// DELETE PROFILE EXPERIENCE
// @route   Delete api/profile/experience
// @desc    Add profiles, user & posts
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// ADD PROFILE EDUCATION
// @route   PUT api/profile/education
// @desc    Add profiles, user & posts
// @access  Private

router.put(
	'/education',
	[
		auth,
		[
			body('school', 'School is required').not().isEmpty(),
			body('degree', 'degree is required').not().isEmpty(),
			body('major', 'major is required').not().isEmpty(),
			body('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: error.array() });
		}
		const { school, degree, major, from, to, current, description } = req.body;
		const newEdu = { school, degree, major, from, to, current, description };
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// DELETE PROFILE EDUCATION
// @route   Delete api/profile/education
// @desc    Add profiles, user & posts
// @access  Private

router.delete('/education/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id);
		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// GET GITHUB REPOS FOR PROFILE
// @route   Get api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public

router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get(
				'githubSecret'
			)}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' },
		};
		request(options, (error, response, body) => {
			if (error) console.error(error);
			if (response.statusCode !== 200) {
				return res.status(404).json({
					msg: 'No Github Profile Found',
				});
			}
			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server');
	}
});

module.exports = router;
