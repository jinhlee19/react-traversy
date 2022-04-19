// Register Auth - src/components/auth/Register.js
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
// impt
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
	// const Register = () => {
	// INITIAL STATE -> useState(초기값)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	// DESTRUCTURE - Pull data from Form Data
	const { name, email, password, password2 } = formData;
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
	// 여기서 e.target.name의 name은 formData의 name이 아니라 key name인듯함.
	// name은 attribute이지만 email, password는 attribute이 아니다.
	// .name은 인풋 태그의 이름, .value가 인풋 태그의 값이다.
	// []로 된건 computed property names
	const onSubmit = async e => {
		// 이때 이 password는 14열에서 받아와서 어디서든 사용할 수 있다.
		if (password !== password2) {
			// console.log('비밀번호가 일치하지 않습니다.');
			setAlert('Passwords do not match', 'danger');
		} else {
			// console.log(formData); // 테스트
			// //// WITHOUT REDUX
			// // *** Req Example
			// const newUser = { name, email, password };
			// try {
			// 	const config = {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 	};
			//     // Javascript 값을 json 문자열로 변환
			// 	const body = JSON.stringify(newUser);
			// 	   // Q) 배열인데 문자열로 어떻게 변환시키는거지? 배열 안의 데이터를 개별적으로 문자열로 바꿔주는건가? 그걸 받아와서 json object로 만들어 뿌려주나?
			//     // post request to (경로, 데이터, 헤더 value를 담은 변수)
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
		<Fragment>
			<section className="container-sub">
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Create Your Account
				</p>
				<form className="form" action="#" onSubmit={e => onSubmit(e)}>
					<div className="form-group">
						<input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
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
							This site uses Gravatar so if you want a profile image, use a Gravatar email
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
		</Fragment>
	);
};
Register.propTypes = {
	// ptfr
	setAlert: PropTypes.func.isRequired,
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
