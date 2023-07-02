export const getIsLogged = (state) => state.auth;
export const getToken = (state) => state.token;
export const areAdvertsLoaded = (state) => state.adverts.areLoaded;
export const getAdverts = (state) =>
    state.adverts.data ? state.adverts.data : [];

export const getAdvertById = (advertId) => (state) =>
    getAdverts(state).find((adverts) => adverts.id === advertId);

export const getAdvertsFilter = (state) => state.filtered;

export const getUi = (state) => state.ui;

export const getModalstate = (state) => state.modal;

export const getTags = (state) => state.tagsList.data;
export const areTagsLoaded = (state) => state.tagsList.areLoaded;
