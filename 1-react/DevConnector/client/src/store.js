import { createStore, applyMiddleware } from 'redux';
// middleware - Thunk를 불러오기위해 applyMiddleware 포함. 
import { composeWithDevTools } from 'redux-devtools-extension';
// middleware thunk
import thunk from 'redux-thunk';
// 여러 reducer 를 불러옴.
// import rootReducer from './reducers/index';
import rootReducer from './reducers';

// all of initial state will be in the reducers
const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)) 
);

export default store;
