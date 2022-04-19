// // REDUCER ALERT - src/reducers/alert.js

// import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// const initialState = [];

// // eslint-disable-next-line import/no-anonymous-default-export
// function alertReducer(state = initialState, action) {
// 	const { type, payload } = action;

// 	switch (type) {
// 		case SET_ALERT:
// 			return [...state, payload];
// 		case REMOVE_ALERT:
// 			return state.filter(alert => alert.id !== payload);
// 		default:
// 			return state;
// 	}
// }
// export default alertReducer;

/////// LECTURE

// REDUCER ALERT - src/reducers/alert.js

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

//// GITHUB VERSION.
