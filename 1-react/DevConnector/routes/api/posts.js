const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Users = require('../../models/Users');
const post = require('../../models/Post');
const profile = require('../../models/Profile');
const user = require('../../models/Users');
const Post = require('../../models/Post');
const checkObjectId = require('../../middleware/checkObjectId');
//// ADD POST ROUTE
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

//// GET ALL POSTS
// @route   GET api/posts
// @desc    Get All Post
// @access  Private

router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		// date:-1 :: most recent first
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//// GET POSTS BY ID
// @route   GET api/posts/:id
// @desc    Get Post by ID
// @access  Private

router.get('/:id', auth, async (req, res) => {
	try {
		const posts = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		// date:-1 :: most recent first
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

//// DELETE A POST
// @route   DELETE api/posts/:id
// @desc    Delete a Post
// @access  Private

router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//If post doesn't exist
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		// date:-1 :: most recent first
		// Check User
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		await post.remove();
		res.json({ msg: 'Post removed' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

//// Like
// @route   PUT api/posts/like/:id
// @desc    Like a Post
// @access  Private

router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// Check if the Post has already been liked.
		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({ msg: 'Post already liked.' });
		}
		post.likes.unshift({ user: req.user.id });
		await post.save();
		// *** 1- filter throw 'likes array', 2 - need to stringify user, 3 - length>0 already been liked
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//// Unlike
// @route   PUT api/posts/unlike/:id
// @desc    Unlike a Post
// @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// Check if the Post has already been liked.
		if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({ msg: 'Post has not yet been liked.' });
		}
		// Get remove index
		const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);
		await post.save();
		// *** 1- filter throw 'likes array', 2 - need to stringify user, 3 - length>0 already been liked
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//// Add a Comment
// @route   Post api/posts/comment/:id
// @desc    Comment on a post
// @access  Public

router.post('/comment/:id', [auth], [check('text', 'Text is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ error: errors.array() });
	}
	try {
		const user = await User.findById(req.user.id).select('-password');
		const post = await Post.findById(req.params.id);

		const newComment = {
			text: req.body.text,
			name: user.name,
			avatar: user.avatar, // Occurs Server Error
			user: req.user.id,
		};
		post.comments.unshift(newComment);
		await post.save();
		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//// Delete a Comment
// @route   Post api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Pull out comment - returns bool
		const comment = post.comments.find(comment => comment.id === req.params.comment_id);

		// make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		// Check User
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authroized' });
		}

		// remove Comment
		const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
		post.comments.splice(removeIndex, 1);
		await post.save();
		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
