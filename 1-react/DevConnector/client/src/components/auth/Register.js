// Register Auth - src/components/auth/Register.js
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
// snipet -> impt 
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = formData;
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
	// 여기서 e.target.name의 name은 formData의 name이 아니라 key name인듯함.
	// name은 attribute이지만 email, password는 attribute이 아니다.
	// .name은 인풋 태그의 이름, .value가 인풋 태그의 값이다.
	// []로 된건 computed property names
	const onSubmit = async e => {
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
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
