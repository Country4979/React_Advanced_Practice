import { render,fireEvent, getByLabelText, screen } from '@testing-library/react';
import { authLogin } from '../actions';

describe('Testing React Redux ASYNC action "authLogin"', () => {
    var dispatch;
    var getState;
    var router;
    var auth;

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
    // Añadir un test para el checkbox
    test('authLogin sets the token when checkbox is checked', async () => {
        // Obtener el checkbox por su etiqueta o por su id
        const checkbox = screen.getByLabelText("Guardar login en un token");
  
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
            token: 'some-token' // Suponer que el servicio devuelve un token
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
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'some-token');
        
      });
  });

