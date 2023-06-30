import {
    ADVERTS_LOADED_FAILURE,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    SET_TOKEN,
    ADVERT_LOADED_REQUEST,
    ADVERT_LOADED_SUCCESS,
    ADVERT_LOADED_FAILURE,
    ADVERT_CREATED_REQUEST,
    ADVERT_CREATED_SUCCESS,
    ADVERT_CREATED_FAILURE,
    ADVERT_DELETED_REQUEST,
    ADVERT_DELETED_SUCCESS,
    ADVERT_DELETED_FAILURE,
    AUTH_LOGOUT,
    ADD_TAGS_REQUEST,
    ADD_TAGS_SUCCESS,
    ADD_TAGS_FAILURE,
    UI_RESET_ERROR,
    ADV_FILTER_NAME,
    ADV_FILTER_SALE,
    ADV_FILTER_TAGS,
    //ADV_FILTER_MIN_PRICE,
    //ADV_FILTER_MAX_PRICE,
    TOGGLE_RESULT,
    ADV_FILTER_PRICE,
    OPEN_MODAL,
    CLOSE_MODAL,
} from './types';
import { areAdvertsLoaded, areTagsLoaded, getAdvertById } from './selectors';

//TOKEN actions
export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token,
});

// LOGIN actions & thunk:
export const authLogin =
    (credentials) =>
    async (dispatch, _getState, { service: { auth }, router }) => {
        dispatch(authLoginRequest());
        try {
            await auth.login(credentials);

            //Logged in:
            dispatch(authLoginSuccess());

            // Set token in the store
            const token = localStorage.getItem('auth');
            dispatch(setToken(token));
            // Redirect to pathname
            const to = router.state?.from?.pathname || '/';
            router.navigate(to);
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
export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT,
});

export const authlogout =
    () =>
    async (dispatch, _getState, { client, service: { auth }, router }) => {
        await auth.logout();
        client.removeAuthorizationHeader();
        dispatch(authLogoutSuccess());
        router.navigate('/login');
    };

// ADVERTS thunk & actions:

export const advertsLoaded =
    () =>
    async (dispatch, getState, { service: { advs } }) => {
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

export const advertLoad =
    (advertId) =>
    (dispatch, getState, { service: { advs } }) => {
        const isLoaded = getAdvertById(advertId)(getState());
        if (isLoaded) {
            return;
        }

        dispatch(advertsLoadedRequest());
        try {
            const advert = advs.getAdvert(advertId);
            dispatch(advertLoadedSuccess(advert));
        } catch (error) {
            dispatch(advertLoadedFailure(error));
        }
    };

//ADD TAGS thunk & actions:
export const getTagsListed =
    () =>
    async (dispatch, getState, { service: { advs } }) => {
        if (areTagsLoaded(getState())) {
            return;
        }
        dispatch(tagListRequest());
        try {
            const tags = await advs.getTagList();
            dispatch(tagListSuccess(tags));
        } catch (error) {
            dispatch(tagListFailure(error));
            throw error;
        }
    };

export const tagListRequest = () => ({
    type: ADD_TAGS_REQUEST,
});

export const tagListSuccess = (tags) => ({
    type: ADD_TAGS_SUCCESS,
    payload: tags,
});

export const tagListFailure = (error) => ({
    type: ADD_TAGS_FAILURE,
    payload: error,
    error: true,
});

//CREATE ADVERT thunk & actions:
export const advertCreatedRequest = () => ({
    type: ADVERT_CREATED_REQUEST,
});

export const advertCreatedSuccess = (advert) => ({
    type: ADVERT_CREATED_SUCCESS,
    payload: advert,
});

export const advertCreatedFailure = (error) => ({
    type: ADVERT_CREATED_FAILURE,
    error: true,
    payload: error,
});

export const advertCreate =
    (advert) =>
    async (dispatch, _getState, { service: { advs }, router }) => {
        dispatch(advertCreatedRequest());
        try {
            const createdAdvert = await advs.createNewAdvert(advert);
            dispatch(advertCreatedSuccess(createdAdvert));
            router.navigate(`/adverts/${createdAdvert.id}`);
            return createdAdvert;
        } catch (error) {
            advertCreatedFailure(error);
            throw error;
        }
    };

//DELETE ADVERT thunk & actions:

export const advertDeletedRequest = () => ({
    type: ADVERT_DELETED_REQUEST,
});

export const advertDeletedSuccess = (advertId) => ({
    type: ADVERT_DELETED_SUCCESS,
    payload: advertId,
});

export const advertDeletedFailure = (error) => ({
    type: ADVERT_DELETED_FAILURE,
    error: true,
    payload: error,
});

export const deletedAdvert =
    (advertId) =>
    async (dispatch, _getState, { service: { advs }, router }) => {
        dispatch(advertDeletedRequest());
        try {
            await advs.deleteAdvert(advertId);
            dispatch(advertDeletedSuccess(advertId));
            router.navigate('/');
        } catch (error) {
            dispatch(advertDeletedFailure(error));
        }
    };

export const adFilterName = (value) => ({
    type: ADV_FILTER_NAME,
    payload: value,
});

export const adFilterSale = (value) => ({
    type: ADV_FILTER_SALE,
    payload: value,
});

export const adFilterTags = (value) => ({
    type: ADV_FILTER_TAGS,
    payload: value,
});

/*export const adFilterMinPrice = (value) => ({
    type: ADV_FILTER_MIN_PRICE,
    payload: value,
});*/

/*export const adFilterMaxPrice = (value) => ({
    type: ADV_FILTER_MAX_PRICE,
    payload: value,
});*/

export const adFilterPrice = (minPrice, maxPrice, exactPrice) => ({
    type: ADV_FILTER_PRICE,
    payload: { minPrice, maxPrice },
});
export function toggleResult(value) {
    return {
        type: TOGGLE_RESULT,
        value, // Show result?
    };
}

//MODAL WINDOWS

export const openModal = (modalType) => ({
    type: OPEN_MODAL,
    payload: modalType
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});
