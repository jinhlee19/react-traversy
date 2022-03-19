// Step 1
import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
// middleware thunk
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

// const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;

// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const initialState = {};

// const middleware = [thunk];

// const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(...middleware))
// );

// export default store;
