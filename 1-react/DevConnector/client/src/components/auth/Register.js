import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
// import axios from 'axios'; // Redux 적용 전  테트

const Register = props => {
	// INITIAL STATE -> useState(초기값)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	// DESTRUCTURE - Pull data from Form Data
	const { name, email, password, password2 } = formData;
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async e => {
		// 이때 이 password는 14열에서 받아와서 어디서든 사용할 수 있다.
		if (password !== password2) {
			console.log('Passwords do not match');
		} else {
			// //// WITHOUT REDUX
			// // *** Req Example
			// const newUser = { name, email, password };
			// console.log(formData);
			// try {
			// 	const config = {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 	};
			//     // Javascript 값을 json 문자열로 변환
			// 	const body = JSON.stringify(newUser);
			//     // post request to (경로, body로 보낼 값, 헤더로 보낼 값)
			// 	const res = await axios.post('/api/users', body, config);
			// 	console.log(res.data);
			// } catch (err) {
			// 	console.error(err.response.data);
			// }
			console.log('success');
		}

		e.preventDefault();
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			<form className="form" action="#" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={e => onChange(e)}
						required
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</section>
	);
};
export default connect(null, { setAlert })(Register);

/*
const [formData, setFormData] = useState({ email: '', password: '' }); 
에서 formData 는 폼에 있는 모든 필드값에 대한 객체. 
setFormData({ ...formData, [e.target.name]: e.target.value });
setFormDate 는 데이터 업데이트를 위해 사용되는 함수  
	...formData 여태까지의 formData 다음에 아래와같은 새로운 키와 value를 추가
	[e.target.name]: e.target.value 
*/
