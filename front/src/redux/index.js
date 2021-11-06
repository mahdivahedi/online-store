import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers';

// Load middleware
const middleWares = [thunk];

let composer;
if (process.env.NODE_ENV !== 'production') {
	const { composeWithDevTools } = require('redux-devtools-extension');
	composer = composeWithDevTools;
	middleWares.push(require('redux-immutable-state-invariant').default());
}
else {
	composer = compose;
}

export const store = (initialState = {}) => createStore(
	RootReducer,
	initialState,
	composer(applyMiddleware(...middleWares)),
);

export const storeConfig = {
	debug: false,
	persistConfig: {
		whitelist: ['user'],
	},
};