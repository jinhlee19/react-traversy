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
