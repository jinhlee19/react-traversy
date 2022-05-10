import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
	
	// 수업버전
		useEffect(()=>{
			getProfileById(match.params.id);
		},[getProfileById])

	// 깃헙 버전
	// const { id } = useParams();
	// useEffect(() => {
	// 	getProfileById(id);
	// }, [getProfileById, id]);

	return (
		<div className="container">
			Profile
			<Spinner />
			<Link to="/edit-profile" className="btn btn-dark">
				Edit Profile
			</Link>
		</div>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	// 로그인 했을경우, edit profile 버튼을 보여주기 위해 auth 상태를 불러옴.
	auth: state.auth,
});

// connect = prop을 담아옴. 최소 프로필 데이터 연결, 그후 getProfileById 부분은 action 부분
export default connect(mapStateToProps, { getProfileById })(Profile);
