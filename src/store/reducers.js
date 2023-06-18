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
    ADV_FILTER_SALE,
    ADV_FILTER_TAGS,
    ADV_FILTER_MIN_PRICE,
    ADV_FILTER_MAX_PRICE,
    TOGGLE_RESULT,
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
    if (action.type === TOGGLE_RESULT){
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
    switch (action.type) {
        case ADV_FILTER_NAME:
            return {
                ...state,
                query: action.payload,
            };
        case ADV_FILTER_SALE:
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
            };
        default:
            return state;
    }
}
/*export function filteredAdverts(state = defaultState, action) {
    switch (action.type) {
        case FILTER_ADVERTS:
            return state.filter((advert) => {
                // Comprueba si el nombre del anuncio coincide con el valor del campo name (ignorando mayúsculas y minúsculas)
                const matchName =
                    action.data.name === '' ||
                    advert.name
                        .toLowerCase()
                        .includes(action.data.name.toLowerCase());
                // Comprueba si el tipo de venta del anuncio coincide con el valor del campo sale
                const matchSale =
                    action.data.sale === '' || advert.sale === action.data.sale;
                // Comprueba si los tags del anuncio incluyen alguno de los valores del campo tags
                const matchTags =
                    action.data.tags.length === 0 ||
                    action.data.tags.some((tag) => advert.tags.includes(tag));
                // Comprueba si el precio del anuncio es menor o igual al valor del campo price
                const matchPrice =
                    action.data.price === '' ||
                    advert.price <= action.data.price;
                // Devuelve true si todos los campos coinciden, false si alguno no coincide
                return matchName && matchSale && matchTags && matchPrice;
            });
        default:
            return state;
    }
}*/
