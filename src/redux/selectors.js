export const getIsLogged = (state) => state.auth;
export const getAdverts = (state) =>
    state.adverts.data ? state.adverts.data : [];

export const getAdvertById = (advertId) => (state) =>
    getAdverts(state).find((adverts) => adverts.id === advertId);

export const getUi = (state) => state.ui;

export const areAdvertsLoaded = (state) => state.adverts.areLoaded;

//export const getTags = (state) => state.tags.data ? state.tags.data : [];
export const getTags = (state) => state.tagsList.data;
export const areTagsLoaded = (state) => state.tagsList.areLoaded;
