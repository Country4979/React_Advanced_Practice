import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { defaultState } from '../../../redux/reducers';

describe('LoginPage', () => {
    const store = {
        getState: () => defaultState,
        subscribe: () => {},
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

        renderComponent();

        const emailInput = screen.getByTestId(/email/);
        const passwordInput = screen.getByTestId(/password/);
        const submitLoginButton = screen.getByTestId(/loginButton/);
        const submitLogoutButton = screen.getByTestId(/logoutButton/);

        //Testing disabled buttons
        expect(submitLoginButton).toBeDisabled();
        expect(submitLogoutButton).toBeDisabled();

        //Events for inputs

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });
    });
});
