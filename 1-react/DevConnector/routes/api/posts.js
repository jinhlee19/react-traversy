const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');

const auth = require('../../middleware/auth');

const Users = require('../../models/Users');
const post = require('../../models/Post');
const profile = require('../../models/Profile');
const user = require('../../models/Users');
const Post = require('../../models/Post');

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

// @route   GET api/posts
// @desc    Get All Post
// @access  Private

router.get('/', auth, async(req,res) => {
	try {
		const posts=await Post.find().sort({date: -1});
		// date:-1 :: most recent first
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/posts/:id
// @desc    Get Post by ID
// @access  Private

router.get('/:id', auth, async(req,res) => {
	try {
		const posts = await Post.findById(req.params.id);
		if(!post){
			return res.status(404).json({msg:'Post not found'});
		}
		// date:-1 :: most recent first
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		if(err.kind === 'ObjectId'){
			return res.status(404).json({msg:'Post not found'});
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/posts/:id
// @desc    Delete a Post
// @access  Private

router.delete('/:id', auth, async(req,res) => {
	try {
		const post =await Post.findById(req.params.id);
		//If post doesn't exist
		if(!post){
			return res.status(404).json({msg:'Post not found'});
		}
		// date:-1 :: most recent first
		// Check User
		if(post.user.toString() !== req.user.id){
			return res.status(401).json({msg: 'User not authorized'});
		}
		await post.remove();
		res.json({msg: 'Post removed'});
	} catch (err) {
		console.error(err.message);
		if(err.kind === 'ObjectId'){
			return res.status(404).json({msg:'Post not found'});
		}
		res.status(500).send('Server Error');
	}
});


module.exports = router;
