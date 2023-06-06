import client from '../../api/client'

export const signup = (credentials) => {
    return client.post('api/auth/signup', credentials)
};