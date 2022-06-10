const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect DB
connectDB();

//  Init Middleware
app.use(express.json({ extended: false }));
// querystring 모듈을 사용하여 쿼리스트링을 해석 true는 qs(외부패키지)

// app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve Static Assets in Production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
//this will look for an environment variable called port to use and when we deploy to hiroku, that's where its going to get the port.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
