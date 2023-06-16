import { authLoginFailure, authLoginSuccess } from '../actions';
import { auth } from '../reducers';

describe('Testing React Redux Reducer', () => {
    describe('"auth" reducer test', () => {
        var state;
        beforeEach(() => {
            state = false;
        });
        //Define the test cases with the different actions and expected values.
        const testCases = [
            [true, 'LOGIN_SUCCESS', authLoginSuccess()],
            [false, 'LOGIN_FAILURE', authLoginFailure()],
        ];
        //Iterating about test cases.
        test.each(testCases)(
            'returns %s when the action is %s',
            (expected, actionName, action) => {
                expect(auth(state, action)).toBe(expected);
            }
        );
    });
});
