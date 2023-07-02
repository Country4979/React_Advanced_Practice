import {
    ADVERTS_LOADED_SUCCESS,
    ADVERT_LOADED_SUCCESS,
    ADVERT_CREATED_SUCCESS,
    ADVERT_DELETED_SUCCESS,
    AUTH_LOGIN_SUCCESS,
    SET_TOKEN,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
    ADD_TAGS_SUCCESS,
    ADV_FILTER_NAME,
    //ADV_FILTER_SALE,
    //ADV_FILTER_TAGS,
    //ADV_FILTER_MIN_PRICE,
    //ADV_FILTER_MAX_PRICE,
    TOGGLE_RESULT,
    ADV_FILTER_PRICE,
    OPEN_MODAL,
    CLOSE_MODAL,
} from './types';

export const defaultState = {
    auth: false,
    token: null,
    adverts: {
        areLoaded: false,
        data: [],
    },
    tags: {
        areLoaded: false,
        data: [],
    },
    filtered: {
        query: '',
        querySale: '',
        queryTags: [],
        queryMinPrice: '',
        queryMaxPrice: '',
    },
    ui: {
        isLoading: false,
        error: null,
        dataFiltered: false,
    },
    modal: {
        isOpen: false,
        modalType: null,
    }
};

export function modal(state = defaultState.ui, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                modalType: action.payload,
            };
        case CLOSE_MODAL:
            return defaultState;
        default:
            return state;
    }
}

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
export function token(state = defaultState.token, action) {
    switch (action.type) {
        case SET_TOKEN:
            return action.payload;
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
        return { ...state, data: [...state.data, action.payload] };
    }
    if (action.type === ADVERT_DELETED_SUCCESS) {
        // Look for the index of the advertisement we want to delete
        const index = state.data.findIndex(
            (advert) => advert.id === action.payload
        );
        // If we find the index, create a new array without the removed advertisement.
        if (index !== -1) {
            return {
                ...state,
                data: state.data.filter(
                    (advert) => advert.id !== action.payload
                ),
            };
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
    if (action.type === TOGGLE_RESULT) {
        return {
            ...state,
            dataFiltered: action.value,
        };
    }
    return state;
}

export function tagsList(state = defaultState.tags, action) {
    if (action.type === ADD_TAGS_SUCCESS) {
        return { areLoaded: true, data: action.payload };
    }
    return state;
}
export function filteredAdverts(state = defaultState.filtered, action) {
    var filteredAdverts = [];
    switch (action.type) {
        /*case ADV_FILTER_NAME:
            const query = action.payload;
            if (state.adverts) {
                if (query === '') {
                    filteredAdverts = state.adverts;
                } else {
                    filteredAdverts = state.adverts.filter(ad => ad.name.toLowerCase().includes(query.toLowerCase()));
                }
            }
            return {
                ...state,
                query: filteredAdverts,
            };*/
        case ADV_FILTER_NAME:
        case ADV_FILTER_PRICE:
            const { query } = action.payload;
            const { minPrice, maxPrice } = action.payload;
            let filteredAdverts;
            if (state.adverts) {
                filteredAdverts = state.adverts;
                if (query !== undefined) {
                    filteredAdverts = filteredAdverts.filter((ad) =>
                        ad.name.toLowerCase().includes(query.toLowerCase())
                    );
                } else if (minPrice !== undefined && maxPrice !== undefined) {
                    filteredAdverts = filteredAdverts.filter(
                        (ad) => ad.price >= minPrice && ad.price <= maxPrice
                    );
                }
            }
            return {
                ...state,
                filteredAdverts,
            };

        /*case ADV_FILTER_SALE:
            return {
                ...state,
                querySale: action.payload,
            };
        case ADV_FILTER_TAGS:
            return {
                ...state,
                queryTags: action.payload,
            };
        case ADV_FILTER_MIN_PRICE:
            return {
                ...state,
                queryMinPrice: action.payload,
            };
        case ADV_FILTER_MAX_PRICE:
            return {
                ...state,
                queryMaxPrice: action.payload,
            };*/
        default:
            return state;
    }
}
