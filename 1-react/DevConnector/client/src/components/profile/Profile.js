import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const { id } = useParams();
	useEffect(() => {
		getProfileById(id);
	}, [getProfileById, id]);

	return (
		<div className="container">
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-light">
						Back To Profiles
					</Link>
					{auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
						<Link to="/edit-profile" className="btn btn-dark">
							Edit Profile
						</Link>
					)}
					<div class="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map(experience => (
										<ProfileExperience key={experience._id} experience={experience} />
									))}
								</Fragment>
							):(<h4>No Experience Credentials</h4>)}
						</div>

						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map(education => (
										<ProfileEducation key={education._id} education={education} />
									))}
								</Fragment>
							):(<h4>No Education Credentials</h4>)}
						</div>
					</div>
				</Fragment>
			)}
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