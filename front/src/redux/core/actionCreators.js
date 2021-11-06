/**
 * Core Action Creators
 *
 * */
import types from './types';
import makeActionCreator from 'redux/utils/makeActionCreator';

// Loadings
export const setLoading = makeActionCreator(types.SET_LOADING, 'loading');
export const setIsMobile = makeActionCreator(types.SET_IS_MOBILE, 'isMobile');
export const setOS = makeActionCreator(types.SET_OS, 'os');
export const setCategories = makeActionCreator(types.SET_CATEGORY, 'categories');
export const setGift = makeActionCreator(types.SET_GIFT, 'gifts');
export const setSubscribe = makeActionCreator(types.SET_SUBSCRIBE, 'subscribes');
export const setLibrary = makeActionCreator(types.SET_LIBRARY, 'library');
