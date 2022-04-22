import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	// 이 값으로 로그인 상태에서 다른 Nav에 보여지는 버튼을 바꿀수 있다. (로그인 이용자= 대시보드, 로그아웃만 보여진다는 등...)
	loading: true,
	user: null,
    // 백엔드에서 api/auth, userdata를 받아온다.
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
                token:null, 
				...payload,
				isAuthenticated: true,
				loading: false,
			}
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
				...state,
                token:null, 
				...payload,
				isAuthenticated: false,
				loading: false,
			}
        default:
            return state;
	}
}
