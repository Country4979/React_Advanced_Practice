import client, { removeAuthorizationHeader, setAuthorizationHeader } from '../../api/client'
import storage from '../../utils/storage';

export const login = (credentials, checked) => {
    return client
    .post('api/auth/login', credentials)
    .then(({accessToken}) => {
        setAuthorizationHeader(accessToken);
        if (checked) {
            console.log('debería guardar el token')
            storage.set('auth', accessToken);
        }
    });
};

export const logout = () => {
    return Promise.resolve().then(() => {
        removeAuthorizationHeader()
        storage.remove('auth')
    });
};