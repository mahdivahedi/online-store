/**
 * User Reducer
 *
 * */
import APP_CONSTANTS from 'constants/app';


import types from './types';
import createReducer from 'redux/utils/createReducer';

// Set initial state
export const initialState = {
	authentication: {
		refreshToken: '',
		accessToken: '',
		status: APP_CONSTANTS.AUTH_STATUS.NOT_AUTHENTICATED,
	},
	profile: {
		id: '',
		username: '',
		firstName: '',
		lastName: '',
		address: '',
		email: '',
		money: 0
	},
};

const userReducer = createReducer(initialState, {
	[types.SET_AUTHENTICATION](state, action) {
		if (!action.authentication) return state;

		return {
			...state,
			authentication: {
				...state.authentication,
				...action.authentication,
			},
		};
	},

	[types.SET_PROFILE](state, action) {
		if (!action.profile) return state;

		return {
			...state,
			profile: {
				...state.profile,
				...action.profile,
			},
		};
	},
});

export default userReducer;