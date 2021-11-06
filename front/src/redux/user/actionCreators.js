/**
 * User Action Creators
 *
 * */
import types from './types';
import makeActionCreator from 'redux/utils/makeActionCreator';

// Loadings
export const setProfile = makeActionCreator(types.SET_PROFILE, 'profile');
export const setAuthentication = makeActionCreator(types.SET_AUTHENTICATION, 'authentication');
