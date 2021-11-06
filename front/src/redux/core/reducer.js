/**
 * Core Reducer
 *
 * */

import createReducer from 'redux/utils/createReducer';
import types from './types';

// Set initial state
export const initialState = {
	isMobile: null,
	os: null,
	loading: false,
	categories: [],
	subscribes: [],
	gifts: [],
	library: []	
};

const coreReducer = createReducer(initialState, {
	[types.SET_LOADING](state, action) {
		let { loading } = action;
		if (loading === undefined) {
			loading = !state.loading;
		}

		return {
			...state,
			loading,
		};
	},

	[types.SET_IS_MOBILE](state, action) {
		if (!action.isMobile === undefined) return state;

		return {
			...state,
			isMobile: action.isMobile,
		};
	},

	[types.SET_OS](state, action) {
		if (!action.os === undefined) return state;

		return {
			...state,
			os: action.os,
		};
	},

	[types.SET_CATEGORY](state, action) {
		if (!action.categories) return state;

		return {
			...state,
			categories: [...action.categories]
		};
	},

	[types.SET_GIFT](state, action) {
		if (!action.gifts) return state;

		return {
			...state,
			gifts: [...action.gifts]
		};
	},

	[types.SET_SUBSCRIBE](state, action) {
		if (!action.subscribes) return state;

		return {
			...state,
			subscribes: [...action.subscribes]
		};
	},

	[types.SET_LIBRARY](state, action) {
		if (!action.library) return state;

		return {
			...state,
			library: [...action.library]
		};
	},
});

export default coreReducer;
