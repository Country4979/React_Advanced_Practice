import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';

import configureStore from './redux';

import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';

const accessToken = storage.get('auth');
if (accessToken) {
    setAuthorizationHeader(accessToken);
}

const router =
    createBrowserRouter([
        {
            path: '*',
            element: <App />,
        }
    ]);
const store = configureStore({ auth: !!accessToken }, { router });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root store={store} router={router} />
    </React.StrictMode>
);

reportWebVitals();
