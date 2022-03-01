const express = require('express');
const router = express.Router();

// @route   Post API/ Users
// @desc    Register user
// @access  Public

// router.get('/')이면 / 주소로 [ GET요청 ]을 하는 것과 같다.
// 이때, '/'는 server.js의 'api/users'에 해당된다.
router.post('/', (req, res) => {
    console.log(req.body);
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
