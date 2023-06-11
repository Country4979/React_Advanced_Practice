import { login } from '../components/auth/service';
import {
    ADVERTS_LOADED,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
} from './types';
//import { useChecked } from './useChecked'; //MEJORAR

export const authLogin = (credentials) => async (dispatch) => {
    dispatch(authLoginRequest());
    try {
        await login(credentials);
        //Logged in:
        dispatch(authLoginSuccess());
    } catch (error) {
        dispatch(authLoginFailure(error))
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
export const authLogout = () => ({
    type: AUTH_LOGOUT,
});

export const advertsLoaded = (adverts) => ({
    type: ADVERTS_LOADED,
    payload: adverts,
});
