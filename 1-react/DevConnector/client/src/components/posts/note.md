# 13.1. Post Reducer, Action, Initial Component

- 실행 순서: 액션 → 리듀서 → 스토어 → 뷰
- 만드는 순서: 리듀서 & combine → 액션 & 타입 → 컴포넌트 생성
- reducer만드는 순서

  : initial state 생성 → 타입 불러오기 → 타입 생성하러 actions 폴더 이동 → 타입 만들기 → 해당 reducer에서 타입이 적용될 시에 가져올 T상태값 및 post: payload 와 같이 뿌려줄 데이터의 키값을 입력한다. → ACTION 에서 비동기로 디스패치할 또는 보낼 payload를 골라준다 / 입력한다. → 컴포넌트 생성하고 connect로 리덕스 연결해준다. mapStateToProp으로 (\_connect = prop을 담아옴. 최소 프로필 데이터 연결, 그후 getPosts 부분은 action 을 가져옴)

- Process

  1. 포스트 리듀서부터 생성한다. (create post reducer)
  2. `reducers/index.js` 에서 경로 및 전체 리듀서로 적용 (이제 알아서 좀 치자)
  3. actions/type.js에서 추가

     _`export_ const GET_POSTS = 'GET_POSTS';`

     _`export_ const POST_ERROR = 'POST_ERROR';`

  4. 포스트 리듀서 편집하기 (reducers/post)

     ```jsx
     import { GET_POSTS, POST_ERROR } from '../actions/types';

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

     		default:
     			return state;
     	}
     }
     ```

  5. 포스트 액션 (

     ```jsx
     import axios from 'axios';
     import { setAlert } from './alert';
     import { GET_POSTS, POST_ERROR } from './types';

     // GET POSTS
     export const getPosts = () => async dispatch => {
     	try {
     		const res = await axios.get('/api/posts');
     		dispatch({
     			type: GET_POSTS,
     			payload: res.data,
     		});
     		dispatch(setAlert('Experience Removed', 'success'));
     	} catch (err) {
     		dispatch({
     			type: POST_ERROR,
     			payload: {
     				msg: err.response.statusText,
     				status: err.response.status,
     			},
     		});
     	}
     };
     ```

  6. posts/Posts.js

     - useEffect - getPost action을 불러오기 위해서.라고함.

     ```jsx
     import React, { Fragment, useEffect } from 'react';
     import PropTypes from 'prop-types';
     import { connect } from 'react-redux';
     import { getPosts } from '../../actions/post';
     import Spinner from '../layout/Spinner';

     const Posts = ({ getPosts, post: { posts, loading } }) => {
     	useEffect(() => {
     		getPosts();
     	}, [getPosts]);
     	return <div>Posts</div>;
     };

     Posts.propTypes = {
     	getPosts: PropTypes.func.isRequired,
     	post: PropTypes.object.isRequired,
     };

     const mapStateToProps = state => ({
     	post: state.post,
     });

     // Getting post state from mapStateToProps
     // connect = prop을 담아옴. 최소 프로필 데이터 연결, 그후 getPosts 부분은 action 부분
     export default connect(mapStateToProps, { getPosts })(Posts);
     ```
