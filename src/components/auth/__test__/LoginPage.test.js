import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { defaultState } from '../../../store/reducers';
import { authLogin } from '../../../store/actions';

jest.mock('../../../store/actions');
jest.mock('../../modals/Modal', () => {
    //Creates a simulated function to check the properties passed to the Modal component
    const mockModal = jest.fn((props) => null);
    return mockModal;
});
describe('LoginPage', () => {
    const store = {
        getState: () => defaultState,
        subscribe: () => jest.fn(),
        dispatch: () => {},
    };
    const renderComponent = () =>
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );

    test('snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    test('should dispatch authLogin action, ()', () => {
        const email = 'test@test.com';
        const password = '123';
        let rememberMe = false;

        renderComponent();

        const emailInput = screen.getByTestId(/email/);
        const passwordInput = screen.getByTestId(/password/);
        const checkboxInput = screen.getByRole('checkbox');
        const submitLoginButton = screen.getByTestId(/loginButton/);
        const submitLogoutButton = screen.getByTestId(/logoutButton/);

        //Testing disabled buttons
        expect(submitLoginButton).toBeDisabled();
        expect(submitLogoutButton).toBeDisabled();

        //Events for inputs
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });

        //Testing Enabled/disabled buttons
        expect(submitLoginButton).toBeEnabled();
        expect(submitLogoutButton).toBeDisabled();

        //Testing Click on Button/Checkbox
        fireEvent.click(submitLoginButton);
        fireEvent.click(checkboxInput);
        fireEvent.change(checkboxInput, { target: { value: rememberMe } });

        expect(authLogin).toHaveBeenCalledWith({ email, password, rememberMe });
    });
});
