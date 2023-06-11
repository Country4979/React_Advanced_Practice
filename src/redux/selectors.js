export const getIsLogged = (state) => state.auth;
export const getAdverts = (state) => (state.adverts ? state.adverts : []);

export const getAdvert = (advertId) => (state) =>
    getAdverts(state).find((advert) => advert.id === advertId);
