export const getIsLogged = (state) => state.auth;
export const getAdverts = (state) => (state.adverts ? state.adverts : []);

export const getAdvertById = (advertId) => (state) =>
    getAdverts(state).find((adverts) => adverts.id === advertId);
