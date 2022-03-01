const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
// @route   Post API/ Users
// @desc    Register user
// @access  Public

// router.get('/')이면 / 주소로 [ GET요청 ]을 하는 것과 같다.
// 이때, '/'는 server.js의 'api/users'에 해당된다.
router.post('/', [check('name', 'Name is required').not().isEmpty(), check('email', 'please include a valid email').isEmail(), check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })], (req, res) => {
	// console.log(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
        // 나중에 프론트에서 에러메세지를 사용할수 있다.
		return res.status(400).json({ errors: errors.array() });
	} 
	res.send('User Route');
});

module.exports = router;

/*
1. need to send data to the route
- name, email, pw to register
- {}로 분리
- console.log로 req.body
- req.body를 실행하기 위해서 initialize middle-ware해야함
*/
