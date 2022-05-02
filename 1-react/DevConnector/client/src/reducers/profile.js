import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
	profile: null,
	// 
	profiles: [],
	// profile listing page
	repos: [],
	loading: true,
	// 기본은 true, request 완료 시 -> false
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}
