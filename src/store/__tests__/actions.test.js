//import { fireEvent, render, screen } from '@testing-library/react';
import { advertLoad, advertLoadedSuccess, authLogin } from '../actions';
//import { LoginPage } from '../../components/auth/LoginPage';
//import axios from 'axios';
//import { applyMiddleware, createStore } from 'redux';
//import ReduxThunk from 'redux-thunk';
//import rootReducer from './rootReducer';
import * as selectors from '../selectors';
describe('Testing React Redux actions', () => {
    var dispatch;
    var getState;
    var service = {};
    var router;
    var auth;
    describe('Testing React Redux ASYNC action "authLogin"', () => {
        beforeEach(() => {
            dispatch = jest.fn(); //Create a dispatch false function
            getState = jest.fn(); //Create a getState false function
            router = { navigate: jest.fn() }; //Create a false router
            auth = {
                login: jest.fn(),
            };
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        //Testing login success

        test('"authLogin" dispatches "authLoginSuccess" & navigates to "/" when login is succeess', async () => {
            auth.login.mockResolvedValue({
                success: true,
                user: {
                    email: 'test@test.com',
                    password: '1234',
                },
            });
            const credentials = {
                email: 'test@test.com',
                password: '1234',
            };
            //Expected dispatched actions
            const expectedActions = [
                { type: 'AUTH_LOGIN_REQUEST' },
                { type: 'AUTH_LOGIN_SUCCESS' },
            ];
            //Dispatch the async action and wait for it to be resolved.
            await authLogin(credentials)(dispatch, getState, {
                service: { auth },
                router,
            });

            //Check that dispatched actions are as expected.
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenNthCalledWith(1, expectedActions[0]);
            expect(dispatch).toHaveBeenNthCalledWith(2, expectedActions[1]);

            // Comprobar que se ha navegado a la ruta /
            expect(router.navigate).toHaveBeenCalledWith('/');
        });
        test('authLogin dispatches "authLoginFailure" and throws error when login fails', async () => {
            // Make the authLogin function return a rejected promise with an error
            const error = new Error('Invalid credentials');
            auth.login.mockRejectedValue(error);

            // Define test credentials
            const credentials = {
                mail: 'test@test.com',
                password: 'wrong',
            };

            // Define the expected action to be dispatched when there is an error.
            const expectedAction = [
                { type: 'AUTH_LOGIN_REQUEST' },
                { type: 'AUTH_LOGIN_FAILURE', payload: error, error: true },
            ];

            // Dispatch the async action and wait for it to be rejected.
            await expect(
                authLogin(credentials)(dispatch, getState, {
                    service: { auth },
                    router,
                })
            ).rejects.toThrow(error);

            // Check that the actions dispatched are as expected and that the error is thrown.
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenNthCalledWith(1, expectedAction[0]);
            expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction[1]);
        });
        /*
        // Añadir un test para el checkbox
        test('authLogin sets the token when checkbox is checked', async () => {
            
            // Crear un objeto con el servicio axios    ERROR AQUÍ
      const extraArgument = {
        axios: axios
      };
    
      // Crear un middleware thunk con el extraArgument
      const thunkMiddleware = ReduxThunk.default.withExtraArgument(extraArgument);
    
      // Aplicar el middleware thunk al store de Redux
      const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
            render(<LoginPage />);
            // Obtener el checkbox por su etiqueta o por su id
            const checkbox = screen.getByLabelText('Remember Login?');
    
            // Comprobar que el checkbox no está activado al principio
            expect(checkbox.checked).toBe(false);
    
            // Simular el clic sobre el checkbox
            fireEvent.click(checkbox);
    
            // Comprobar que el checkbox está activado después del clic
            expect(checkbox.checked).toBe(true);
    
            // Simular el login exitoso con el checkbox activado
            auth.login.mockResolvedValue({
                success: true,
                user: {
                    email: 'test@test.com',
                    password: '1234',
                },
                token: 'some-token', // Suponer que el servicio devuelve un token
            });
            const credentials = {
                email: 'test@test.com',
                password: '1234',
            };
            await authLogin(credentials)(dispatch, getState, {
                service: { auth },
                router,
            });
    
            // Comprobar que se ha guardado el token en algún lugar (por ejemplo, en localStorage)
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'token',
                'some-token'
            );
        });*/
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
