import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const { email, password } = formData;
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
		/*
		const [formData, setFormData] = useState({ email: '', password: '' }); 
		에서 formData 는 폼에 있는 모든 필드값에 대한 객체. 
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setFormDate 는 데이터 업데이트를 위해 사용되는 함수  
		 ...formData 여태까지의 formData 다음에 아래와같은 새로운 키와 value를 추가
		 [e.target.name]: e.target.value 
		 */
	const onSubmit = async e => {
		console.log('success');
		e.preventDefault();
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign into Your Account
			</p>
			<form className="form" action="#" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={e => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</section>
	);
};

export default Login;
