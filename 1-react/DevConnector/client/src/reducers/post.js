import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map(post => (post._id === payload.id ? { ...post, likes: payload.likes } : post)),
				loading: false,
			};
		default:
			return state;
	}
}
// post의 likes가 변경되면 post 전체를 업데이트해주는 듯. 근데 왜 post id와 payload id가 같은 값일때가 기준이 되는지 이해가 안되는 부분.
