// Consts and Libs
import APP_CONSTANTS from 'constants/app';

// Actions
import { postAPI, getAPI } from 'redux/core/actions';

// Action Creators
import { setAuthentication, setProfile } from 'redux/user/actionCreators';
import { setGift, setLibrary, setSubscribe } from 'redux/core/actionCreators';

export function refreshToken() {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { user: { authentication, profile } } = getState();
			const { mobile } = profile;
			const { refreshToken, refreshTokenAt } = authentication;
			const now = new Date().getTime();
			if (refreshTokenAt < now) {
				await dispatch(setAuthentication({ refreshTokenAt: now + (2 * 60 * 1000) }));
				const data = await dispatch(postAPI('verification', { mobile, refreshToken }));
				return resolve(data);
			}
			return resolve();
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function loginAction(mobile, password) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {

			const { user } = getState();
			const data = await dispatch(postAPI('login', {
				username: mobile,
				password
			}));
			console.log(data)
			const authentication = {
				refreshToken: data[0].jwt,
				accessToken: data[0].jwt,
				status: APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED,
			};

			dispatch(setAuthentication(authentication));

			const profile = {
				email: mobile,
				firstName: data[0].firstName,
				lastName: data[0].lastName,
				money: data[0].accountCharge,
				address: data[0].address
			};

			await dispatch(setProfile(profile));

			return resolve(data);
		}
		catch (err) {
			if (err.statusCode === APP_CONSTANTS.ERROR_CODE.TOKEN_IS_NOT_VALID) {
				const authentication = {
					accessToken: '',
					refreshToken: '',
					status: APP_CONSTANTS.AUTH_STATUS.NOT_AUTHENTICATED,
				};
				dispatch(setAuthentication(authentication));
			}
			return reject(err);
		}
	});
}

export function loginOtp(accessToken, refreshToken) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {

			const authentication = {
				refreshToken: refreshToken,
				accessToken: accessToken,
				status: APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED,
			};

			dispatch(setAuthentication(authentication));

			return resolve();
		}
		catch (err) {
			if (err.statusCode === APP_CONSTANTS.ERROR_CODE.TOKEN_IS_NOT_VALID) {
				const authentication = {
					accessToken: '',
					refreshToken: '',
					status: APP_CONSTANTS.AUTH_STATUS.NOT_AUTHENTICATED,
				};
				dispatch(setAuthentication(authentication));
			}
			return reject(err);
		}
	});
}

export function completeProfile(firstName, lastName, address, password) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { user } = getState();
			const profile = {
				firstName,
				lastName,
				address,
				password,
			};

			dispatch(setProfile(profile));

			return resolve(data);
		}
		catch (err) {
			reject(err);
		}
	})
}

export function changeMoney(money) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { user } = getState();
			const profile = {
				money
			};

			dispatch(setProfile(profile));

			return resolve();
		}
		catch (err) {
			reject(err);
		}
	})
}

export function setGoogleProfile(profile) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { user } = getState();

			dispatch(setProfile(profile));
		}
		catch (err) {
			reject(err);
		}
	})
}

export function setGoogleAuth(Auth) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { user } = getState();

			dispatch(setAuthentication(Auth));
		}
		catch (err) {
			reject(err);
		}
	})
}

export function logoutAction() {
	return dispatch => new Promise(async (resolve, reject) => {
		try {
			const profile = {
				firstName: '',
				lastName: '',
				email: '',
				money: '',
				password: '',
			};
			dispatch(setProfile(profile));
			const authentication = {
				accessToken: '',
				refreshToken: '',
				status: APP_CONSTANTS.AUTH_STATUS.NOT_AUTHENTICATED,
			};
			dispatch(setAuthentication(authentication));
			return resolve();
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function updateProfileAction() {
	return () => new Promise(async resolve => resolve());
}

export function getProfileAction(id) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { user } = getState();
			let data;

			if (!id || user.profile.id === id || id === 'me') {
				data = await dispatch(getAPI('getMyProfile'));
			}
			else {
				data = await dispatch(getAPI('getUserProfile', { hashid: id }));
			}

			return resolve(data);
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function setUserLibrary(slug) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { core } = getState();

			let library = [...core.library];

			library.push(slug)

			await dispatch(setLibrary([...library]))
			return resolve(core);
		}
		catch (err) {
			return reject(err);
		}
	});
}

export function removeUserLibrary(slug) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		try {
			const { core } = getState();

			let library = [...core.library];

			library = library.filter(e => e !== slug);
			// console.log(library)

			await dispatch(setLibrary([...library]))
			// console.log(core.library)
			return resolve(core);
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
export function setProfileAction(profile) {
	return (dispatch, getState) => new Promise(async (resolve, reject) => {
		dispatch(setProfile(profile));
		return resolve();
	})
}
