// Consts and Libs
import APP_CONSTANTS from 'constants/app';
import API_CONSTANTS from 'constants/api';
import API from 'libs/API';
import Translation from 'libs/Translation';

// Action Creators
import { logoutAction } from 'redux/user/actions';
import { setAuthentication } from 'redux/user/actionCreators';
import { setCategories, setGift, setLoading, setSubscribe } from './actionCreators';

export function apiCall(apiKey, body, params, jsonType = true, thirdParty = false) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		const { user: { authentication, lang, currency } } = getState();
		console.log(apiKey)
		const api = API_CONSTANTS[apiKey];
		console.log(api)
		const url = `${thirdParty ? '' : APP_CONSTANTS.API_HOST_NAME}${api.endpoint}`;
		const jwt = !api.escapeJWT ? authentication.accessToken : null;
		const isAuth = authentication.status === APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED;
		// console.log(url, api.method, body, params);

		return API(url, api.method, body, params, jsonType, jwt, lang, currency, thirdParty)
			.then(res =>
				resolve(res))
			.catch(async err => {
				const code = err.statusCode || err.code;
				if (typeof err === 'string' && err.includes('Failed to fetch')) {
					return reject(
						Translation.t('label.check_internet_connection'),
					);
				}

				if (apiKey === 'refreshToken') {
					return dispatch(logoutAction());
				}

				if (code === APP_CONSTANTS.ERROR_CODE.UNAUTHORIZED && isAuth) {
					await dispatch(refreshTokenAction());
					try {
						const res = await dispatch(apiCall(apiKey, body, params, jsonType, thirdParty));
						return resolve(res);
					}
					catch (err) {
						return reject(err);
					}
				}

				return reject(err);
			});
	});
}

export function refreshTokenAction() {
	return (dispatch, getState) => new Promise((resolve, reject) => { (async () => {
		try {
			const { user: { authentication } } = getState();
			const token = authentication.refreshToken;
			const data = await dispatch(postAPI('refreshToken', { token }));

			await dispatch(setAuthentication({
				...data,
				status: APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED,
			}));

		return resolve(data);
		}
		catch (err) {
		return reject(err);
		}
		})();
	});
}

export function getAPI(apiKey, params) {
	return dispatch => new Promise(async (resolve, reject) => {
		try {
			const res = await dispatch(apiCall(apiKey, null, params));
			return resolve(res.data);
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function postAPI(apiKey, body, params) {
	return dispatch => new Promise(async (resolve, reject) => {
		try {
			const res = await dispatch(apiCall(apiKey, body, params));
			return resolve(res.data);
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function getInfo() {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			let data = await dispatch(postAPI('common'));
			data = data.results;
			const user = data.user;
			const gift = data.gift;
			const subscribe = data.subscription;

			await dispatch(setGift([...gift]));
			await dispatch(setSubscribe([...subscribe]));

			return resolve(data);
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function getCategories() {
	return dispatch => new Promise(async (resolve, reject) => {
		try {
			let res = await dispatch(getAPI('getCategory'));
			res = res.results
			await dispatch(setCategories([...res]));

			return resolve(res);
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function formDataAPI(apiKey, body, params) {
	return dispatch => new Promise(async (resolve, reject) => {
		try {
			const res = await dispatch(apiCall(apiKey, body, params, false));
			return resolve(res.data);
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function thirdPartyAPI(service, apiKey, body, params = {}) {
	return dispatch => new Promise(async (resolve, reject) => {
		try {
			const newParams = {
				...params,
			};
			switch (service) {
				case 'mapbox':
					newParams.access_token = APP_CONSTANTS.MAPBOX_TOKEN;
					break;

				default: break;
			}

			const res = await dispatch(apiCall(apiKey, body, newParams, true, true));
			return resolve(res);
		}
		catch (err) {
			return reject(err);
		}
	});
}
/*
 *************************************************************
 **** without async call (just change something in store) ****
 *************************************************************
 */
export function setLoadingAction(status) {
	return dispatch => dispatch(setLoading(status));
}
