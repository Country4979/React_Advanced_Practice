import { login } from '../components/auth/service';
import { getLastAdv } from '../components/adverts/service';
import {
    ADVERTS_LOADED_FAILURE,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
} from './types';

// LOGIN actions & thunk:
export const authLogin = (credentials) => async (dispatch) => {
    dispatch(authLoginRequest());
    try {
        await login(credentials);
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

export const advertsLoaded = () => async (dispatch, getState) => {
    dispatch(advertsLoadedRequest());
    try {
        const adverts = await getLastAdv();
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
