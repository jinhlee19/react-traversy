import axios from 'axios';
import { setAlert } from './alert';

import {
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	GET_REPOS,
} from './types';

// Get Current User Profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get All Profiles
export const getProfiles = () => async dispatch => {
	// 이전 사용자 프로필 보여지는 상황을 예방한다.
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get('/api/profile');
		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get Profile by ID

export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get Github Repos
export const getGithubRepos = username => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`);
		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Create or Update Profile
export const createProfile =
	(formData, navigate, edit = false) =>
	async dispatch => {
		try {
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			// const res = await axios.post('/api/profile', formData, config);
			const res = await axios.post('/api/profile', formData, config);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
			if (!edit) {
				navigate('/dashboard');
			}
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};

// Add Experience
export const addExperience = (formData, navigate) => async dispatch => {
	// TODO 이후 '../utils/api'; 에서 한번에 가져오도록

	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		const res = await axios.put('/api/profile/experience', formData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Experience Added', 'success'));
		navigate('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Add Education
export const addEducation = (formData, navigate) => async dispatch => {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		const res = await axios.put('/api/profile/education', formData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Education Added', 'success'));
		navigate('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`api/profile/experience/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Experience Removed.', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete Education
export const deleteEducation = id => async dispatch => {
	try {
		const res = await axios.delete(`api/profile/education/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Education Removed.', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete Account and Profile
export const deleteAccount = id => async dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			await axios.delete('api/profile');

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });
			dispatch(setAlert('Your account has been permanantly deleted.'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}
};
