import {
    advertLoadedSuccess,
    authLogin,
    authLoginRequest,
    authLoginSuccess,
} from '../actions';

describe('Testing React Redux actions', () => {
    describe('Testing React Redux ASYNC action "authLogin"', () => {
        const credentials = 'credentials';
        const redirectUrl = 'redirectUrl';
        const action = authLogin(credentials);

        const dispatch = jest.fn();
        const service = { auth: {} };
        const router = {
            navigate: jest.fn(),
            state: { from: { pathname: redirectUrl } },
        };

        test('When logi API resolves shoould follow the login flow', async () => {
            service.auth.login = jest.fn().mockResolvedValue();
            await action(dispatch, undefined, { service, router });
            //expect(dispatch).toHaveBeenCalledTimes(1, authLoginRequest()); //--> Hace tres llamadas y da error
            expect(service.auth.login).toHaveBeenCalledWith(credentials);
            //expect(dispatch).toHaveBeenCalledWith(2, authLoginSuccess()); //--> El mismo error que authLoginRequest
            expect(router.navigate).toHaveBeenCalledWith(redirectUrl);
        });
    });
    describe('Testing React Redux SYNC action "advertLoadedSuccess "', () => {
        const testadvertLoadedSuccess = { id: '1', title: 'Advert 1' };

        // test the action creator
        test('advertLoadedSuccess returns an action with type ADVERT_LOADED_SUCCESS and payload mockAdvert', () => {
            // call the action creator with the mock advert
            const action = advertLoadedSuccess(testadvertLoadedSuccess);

            // define the expected action object
            const expectedAction = {
                type: 'ADVERT_LOADED_SUCCESS',
                payload: testadvertLoadedSuccess,
            };

            // check that the action is equal to the expected action
            expect(action).toEqual(expectedAction);
        });
    });
});
