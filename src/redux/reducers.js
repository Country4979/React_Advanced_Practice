import {
    ADVERTS_LOADED,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
} from './types';

export const defaultState = {
    auth: false,
    adverts: [],
    ui: {
        isLoading: false,
        error: null,
    },
};

export function auth(state = defaultState.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return true;
        case AUTH_LOGOUT:
            return false;
        default:
            return state;
    }
}

export function adverts(state = defaultState.adverts, action) {
    if (action.type === ADVERTS_LOADED) {
        return action.payload;
    }
    return state;
}

export function ui(state = defaultState.ui, action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return { isLoading: true, error: null };
        case AUTH_LOGIN_FAILURE:
            return { isLoading: false, error: action.payload };
        case AUTH_LOGIN_SUCCESS:
            return { isLoading: false, error: null };
            case UI_RESET_ERROR:
                return {...state, error: null}
        default:
            return state;
    }
}
