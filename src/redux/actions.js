import {
    ADVERTS_LOADED,
    ADVERT_CREATED,
    ADVERT_DELETED,
    AUTH_LOGIN,
    AUTH_LOGOUT,
} from './type';

export const authLogin = () => ({
    type: AUTH_LOGIN,
});

export const authLogout = () => ({
    type: AUTH_LOGOUT,
});

export const advertsLoaded = (advs) => ({
    type: ADVERTS_LOADED,
    payload: advs,
});
export const advertCreated = () => ({
    type: ADVERT_CREATED,
});
export const advertDeleted = () => ({
    type: ADVERT_DELETED,
});
