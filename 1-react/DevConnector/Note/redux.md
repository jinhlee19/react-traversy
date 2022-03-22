# 7. Creating a Redux Store

[정의]

    - Redux는 상태관리(statemanager) 라이브러리
    - Reducer - 액션을 담는 단순한 함수

[PROCESS]

    1. Reducer로 액션을 보낸다.(dispatch)
    2. Reducer가 상태를 어떻게 다룰건지, 화면의 컴포넌트로 어떻게 넘길건지 결정한다.
    3. 필요한 컴포넌트를 업데이트한다.

[DIAGRAM]

    Profile reducer가 상태값을 넘겨주면 프로필의 상태로부터 로그온/아웃 상태를 받아서 ui를 그려준다.

7.1. STORE - src/store.js 생성

```javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// thunk 라는 middleware 불러오기
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// all of initial state will be in the reducers
const initialState = {};
const middleware = [thunk];
const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```

    store.js는 Boilerplate 사용.
    - redux devtools package를 사용해서 Redux 문서와 다르게 store.js 작성
    - middleware - Thunk를 불러오기위해 `applyMiddleware` 포함.

7.2. app.js 에 추가

```javascript
// Redux
import { Provider } from 'react-redux';
import store from './store';
```

```javascript
const App = () => (
	<Provider store={store}>
		<Router>
			<Fragment>
				<Navbar />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Fragment>
		</Router>
	</Provider>
);
```

7.3. ROOT REDUCER - reducers/index.js

-
- src/reducers/index.js 생성 - root reducer
- 여기서 다른 reducer 들 가져와서 사용.

```javascript
import { combineReducers } from 'redux';
export default combineReducers({
	// 여기에 reducers 추가
});
```

# 8. Alert Reducer, Action and Types

[PROCESS]

- 액션을 넣는다 - 이런 형태의 객체의 배열 array of object.

  1. ‘alert.js’라는 reducer를 생성
  2. 그 안에 들어가는 {}이하의 부분이 action
  3. action 안에는 필수값으로 type과 payload를 포함.

[REMIND]

- reducer는 단순히 액션을 담는 함수다. 그리고 액션을 보낸다(dispatch).
- reducer는 변경이 필요한 컴포넌트의 상태값 업데이트를 결정한다

## 8.1. Add ‘Alert’ to Root Reducer

```javascript
import { combineReducers } from 'redux';
import alert from './alert';
export default combineReducers({
	alert,
});
```

## 8.2. reducer/alert.js

```javascript
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case REMOVE_ALERT:
			return state.filter(alert => alert.id !== payload);
		default:
			return state;
	}
}
```
