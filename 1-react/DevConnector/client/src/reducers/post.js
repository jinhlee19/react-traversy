import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from '../actions/types';

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
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			};
		case ADD_POST:
			return {
				...state,
				//올라간대매 올라가긴 개뿔 refresh하면 내려가는데
				posts: [payload, ...state.posts],
				loading: false,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload),
				loading: false,
			};
		case ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: payload },
				loading: false,
			};
		case REMOVE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter(comment => comment._id !== payload),
				},
				loading: false,
			};
		// 이부분 다시보기 ***
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
// post의 likes가 변경되면 post 전체를 업데이트해주는 듯. 근데 왜 post id와 payload id가 같은 값일때가 기준이 되는지 이해가 안되는 부분. payload.id는 post id인가? auth id가 아닌 다른 아이디가 아닌 payload.id가?
