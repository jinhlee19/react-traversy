# Note

## 1. Initiate

```shell
npm init
```

## 2. Dependencies 설치

```shell
npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request
```

## 3. Dev Dependencies 설치

```shell
npm i -D nodemon concurrently
```

## 4. server.js

this will look for an environment variable called port to use and when we deploy to hiroku, that's where its going to get the port.

> 세팅된 환경변수에 따라서 포트 변경시켜주기. 환경이 없을때 || (or) 5000포트에 배치

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ${PORT}'));
```

node server는 heroku에 배포할때 필요
server: nodemon server는 서버를 재시작할 필요 없이 server라는 파일,
이후에 리액트를 실행하는 클라이언트 스크립트, concurrent dev 스크립트를 추가 할 예정

```json
"scripts": {
  "start": "node server",
  "server": "nodemon server"
},
```

## 5. Postman에서 get request 넣기

get request to port 5000

## 6.1. config/default.json

create /config/default.json

```json
{
    "mongoURI": "mongodb+srv://<username>:<password>@devconnector.
    iixhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}
```

## 6.2. db.js

/config/db.js

```javascript
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, { useNewUrlParser: true });
		console.log('MongoDB Connected...');
	} catch (err) {
		console.log(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
console.log(db);
module.exports = connectDB;
```

## 7. Route Files with Express Router

> Must REVIEW

- create the files where we're going to create all of our roots and we want to break it up by resource so we'll have users auths profile and post.

- separate files for all of our roots.

- /routes/api/auth.js, posts,js, profile.js, users.js

> creating a folder within here called API because there's no server rendered templates or anything in this case.

- roots going to return JSON for our API

## 7.1.Route Files with Express Router

주석 붙여넣기

```javascript
// @route   Get API/ Users
// @desc    Test Route
// @access  Public
```

@ acceess -> public and private - token으로 user를 인증해서 이동 허용하는 부분 \*\*

## 예시 auth

```javascript
const express = require('express');
const router = express.Router();

// @route   Get API/ Users
// @desc    Test Route
// @access  Public

// router.get('/')이면 / 주소로 [ GET요청 ]을 하는 것과 같다.
// 이때, '/'는 server.js의 'api/users'에 해당된다.
router.get('/', (req, res) => res.send('User Route'));

module.exports = router;
```

## 8.2.

/! At server.js

```javascript
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
```

## 9. postman에서 Collection 만들기.

- User & Auth, Posts, Profiles

## 10. schema

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('user', UserSchema);
```

## 11.

- Goal
  - create a route that will register user
  - implement express validator - response to the correct user
  - validator - clean response

```javascript
// users.js
const express = require('express');
const router = express.Router();
// @route   Post API/ Users
// @desc    Register user
// @access  Public
router.get('/', (req, res) => res.send('User Route'));
module.exports = router;
```

```javascript
// users.js
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
```

```javascript
// @ server.js
// Init Middleware (after connect DB)
app.use(express.json({ extended: false }));
```

### 11.1.

- Postman
  - Post - http://localhost:5000/api/users
    header
    - key: content-type
    - value- application/json
  - Body
    - `{"name": "rafy"}`

### 11.2. EXPRESS VALIDATOR

```javascript
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send('User Route');
	}
);
```

### 11.3. User

**_Workflow_**

```javascript
//See if user exists
//Get users Gravatar
//Encrypt password
//Return jsonwebtoken
```

### JWT

Header - Payload
payload - data to send
iat - issued at - timestamp

```javascript
//
const jwt = require('jsonwebtoken');

...
			// Return jsonwebtoken
			// res.send('User Registered.');
			// payload - object - user:id
			// mongodb의 _id -> mongoose에서 .id로 잡힌다
			const payload = {
				user: {
					id: user.id,
				}
			};
			// 3600 = 1hr
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				//else?
				res.json({ token });
			});
			...
```

### Auth Middleware and JWT Verify

//create /middleware/auth.js

```javascript

```

todos

- 보충하기
- async await
- middleware
- server.js
- process
- users.js
