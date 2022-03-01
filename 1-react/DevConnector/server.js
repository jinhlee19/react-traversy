const express = require('express');
const connectDB = require('./config/db')

const app = express();

// Connect DB
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
// this will look for an environment variable called port to use and when we deploy to hiroku, that's where its going to get the port.
// 세팅된 환경변수에 따라서 포트 변경시켜주기. 환경이 없을때 || (or) 5000포트에 배치
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
