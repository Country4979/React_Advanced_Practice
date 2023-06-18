import { render } from '@testing-library/react';
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
});
