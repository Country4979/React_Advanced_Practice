import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';

import configureStore from './redux';

import { BrowserRouter } from 'react-router-dom';

const accessToken = storage.get('auth');
if (accessToken) {
    setAuthorizationHeader(accessToken);
}

const store = configureStore();
window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App isInitiallyLogged={!!accessToken} />
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
