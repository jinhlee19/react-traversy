const jwt = require(`jsonwebtoken`);
const config = require('');


module.exports = function (req, res, next) {
	// Get token from hearder
	const token = req.header('x-auth-token');
	// check if no token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authroization denied' });
	}
	// Verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		// user with payload
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};

/*
강의 설명 :
이전))
1) 유저를 등록하고 -> 2) 유저id 페이로드를 갖는 json 웹토큰을 돌려 받는다.
여기서는)) 
3) 돌려받은 토큰으로 보호된 라우트로 이동할 수 있는 권한을 받는다. 

5열)
module.export 
since its middleware function -> req,res,next 
middleware function이란 req, res cycle 또는 객체에 접근해서 
next는 callback으로 들어가서 req, res가 끝난 후 next piece of middleware로 이동할 수 있도록 해준다.

7열) 
token 받아오기 
객체를 요청 ( request object) 할 수 있다 -> 요청으로 객체의 헤더의 x-auth-token을 받아온다
이부분 그냥 일단 암기. 'x-auth-token'

9열 if no token -> res. (응답): 401 == not authorized
14열 jwt.verify()메서드로 decode - token, config.get('jwtSecret')
[https://velog.io/@neity16/NodeJS-JWT-Token-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0]
[https://github.com/auth0/node-jsonwebtoken]


*/
