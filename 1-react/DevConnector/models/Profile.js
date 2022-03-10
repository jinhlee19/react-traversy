const mongoose = require('mongoose');

// Create Schema
const ProfileSchema = new mongoose.Schema({
	// reference to user model.
	// 모든 프로필은 유저와 관련되기 때문에..
	user: {
		type: mongoose.Schema.Types.ObjectId, ref: 'user',
		//user모델의 user의 _id(user모델 안에 보이지는 않지만 부여된 _id)와 연결. ref는 user 모델전체. email, avatar, name들어가지만 pw는 미적용. auth.js에서의 user 관계??
	},
	handle: {
		type: String,
		max: 40,
	},
	company: {
		type: String,
	},
	website: {
		type: String,
	},
	location: {
		type: String,
	},
	status: {
		type: String,
		required: true,
	},
	skills: {
		type: [String],
		required: true,
	},
	bio: {
		type: String,
	},
	githubusername: {
		type: String,
	},
	experience: [
		{
			title: {
				type: String,
				required: true,
			},
			company: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	education: [
		{
			school: {
				type: String,
				required: true,
			},
			degree: {
				type: String,
			},
			major: {
				type: String,
				required: true,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	social: {
		youtube: {
			type: String,
		},
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		instagram: {
			type: String,
		}
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
