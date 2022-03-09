const mongoose = require('mongoose');
const config = require('config');
const { use } = require('../routes/api/users');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, { 
			useNewUrlParser: true, 
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.log(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
console.log(db);
module.exports = connectDB;
