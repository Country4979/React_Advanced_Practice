import {
    ADVERTS_LOADED_SUCCESS,
    ADVERT_LOADED_SUCCESS,
    ADVERT_CREATED_SUCCESS,
    ADVERT_DELETED_SUCCESS,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
    ADD_TAGS_SUCCESS,
} from './types';

export const defaultState = {
    auth: false,
    adverts: {
        areLoaded: false,
        data: [],
    },
    tags: {
        areLoaded: false,
        data: [],
    },
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
    if (action.type === ADVERTS_LOADED_SUCCESS) {
        return { areLoaded: true, data: action.payload };
    }
    if (action.type === ADVERT_LOADED_SUCCESS) {
        return { ...state, data: [action.payload] };
    }
    if (action.type === ADVERT_CREATED_SUCCESS) {
        return { ...state, data: [...state.data, action.payload] }
    }
    if (action.type === ADVERT_DELETED_SUCCESS) {
        // Look for the index of the advertisement we want to delete
        const index = state.data.findIndex(
            (advert) => advert.id === action.payload
        );
        // If we find the index, create a new array without the removed advertisement.
        if (index !== -1) {
            return {...state, data: state.data.filter(advert => advert.id !== action.payload) };
        }
        // Create a copy of the original array and update the advertisement load in the state
        return {
            ...state,
            data: [...state.data],
        };
    }
    return state;
}

export function ui(state = defaultState.ui, action) {
    if (action.error) {
        return { isLoading: false, error: action.payload };
    }

    if (/_REQUEST$/.test(action.type)) {
        return { isLoading: true, error: null };
    }

    if (/_SUCCESS$/.test(action.type)) {
        return { isLoading: false, error: null };
    }

    if (action.type === UI_RESET_ERROR) {
        return { ...state, error: null };
    }

    return state;
}

export function tagsList(state = defaultState.tags, action) {
    if (action.type === ADD_TAGS_SUCCESS) {
        return { areLoaded: true, data: action.payload };
    }
    return state;
}
