import {
    ADVERTS_LOADED_FAILURE,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    ADVERT_LOADED_REQUEST,
    ADVERT_LOADED_SUCCESS,
    ADVERT_LOADED_FAILURE,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
} from './types';
import { areAdvertsLoaded } from './selectors';

// LOGIN actions & thunk:
export const authLogin =
    (credentials) =>
    async (dispatch, _getState, { auth }) => {
        dispatch(authLoginRequest());
        try {
            await auth.login(credentials);
            //Logged in:
            dispatch(authLoginSuccess());
        } catch (error) {
            dispatch(authLoginFailure(error));
            throw error;
        }
    };

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
    type: AUTH_LOGIN_SUCCESS,
});
export const authLoginFailure = (error) => ({
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error,
});

export const uiResetError = () => ({
    type: UI_RESET_ERROR,
});

//LOGOUT
export const authLogout = () => ({
    type: AUTH_LOGOUT,
});

// ADVERTS thunk & actions:

export const advertsLoaded =
    () =>
    async (dispatch, getState, { advs }) => {
        if (areAdvertsLoaded(getState())) {
            return;
        }

        dispatch(advertsLoadedRequest());
        try {
            const adverts = await advs.getLastAdv();
            dispatch(advertsLoadedSuccess(adverts));
        } catch (error) {
            dispatch(advertsLoadedFailure(error));
            throw error;
        }
    };

export const advertsLoadedRequest = () => ({
    type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSuccess = (adverts) => ({
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
});

export const advertsLoadedFailure = (error) => ({
    type: ADVERTS_LOADED_FAILURE,
    error: true,
    payload: error,
});

// ADVERT DETAIL thunk & actions:
export const advertLoaded =
    () =>
    async (dispatch, getState, { advs }) => {
        dispatch(advertsLoadedRequest());
        try {
            const adverts = await advs.getLastAdv();
            dispatch(advertsLoadedSuccess(adverts));
        } catch (error) {
            dispatch(advertsLoadedFailure(error));
            throw error;
        }
    };

export const advertLoadedRequest = () => ({
    type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedSuccess = (adverts) => ({
    type: ADVERT_LOADED_SUCCESS,
    payload: adverts,
});

export const advertLoadedFailure = (error) => ({
    type: ADVERT_LOADED_FAILURE,
    error: true,
    payload: error,
});
