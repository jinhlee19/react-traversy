import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
// import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const { id } = useParams();
	useEffect(() => {
		//
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
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map(experience => (
										<ProfileExperience key={experience._id} experience={experience} />
									))}
								</Fragment>
							) : (
								<h4>No Experience Credentials</h4>
							)}
						</div>

						<div className="profile-edu bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map(education => (
										<ProfileEducation key={education._id} education={education} />
									))}
								</Fragment>
							) : (
								<h4>No Education Credentials</h4>
							)}
						</div>
						{/* {profile.githubusername && <ProfileGithub username={profile} />} */}
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

/*
질문: 
78열 - mapStateToProps의 state는 어디서 나오는 건가. 인자로 뜬금없이 받아서 .profile과 .auth를 연결하는 원리?
14열 - profile을 받아와서 profile안의 profile과 loading을 각각 뿌려주는데 어디서 온건지 
---> reducer 에서 받아오는 값. profile은 payload

*/
