import { combineReducers } from 'redux';

import core from './core/reducer';
import user from './user/reducer';

// Combine all
const appReducer = combineReducers({
	user,
	core
});

// Setup root reducer
const RootReducer = (state, action) => {
	const newState = action.type === 'RESET' ? undefined : state;
	return appReducer(newState, action);
};

export default RootReducer;
