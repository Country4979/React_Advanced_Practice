import './App.css';
import LoginPage from './components/auth/LoginPage';
import NewAdvertPage from './components/adverts/NewAdvertPage';
import AdvertsPage from './components/adverts/AdvertsPage';
import AdvertPage from './components/adverts/AdvertPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';

function App({ isInitiallyLogged }) {
    const [isLogged, setIsLogged] = useState(isInitiallyLogged);

    const handleLogin = () => {
        setIsLogged(true);
    };

    const handleLogout = () => {
        setIsLogged(false);
    };

    return (
        <div className='App'>
            <Layout title='AlaPop'>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route
                        path='/adverts'
                        element={
                            <RequireAuth>
                                <AdvertsPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/adverts/:id'
                        element={
                            <RequireAuth>
                                <AdvertPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/adverts/new'
                        element={
                            <RequireAuth isLogged={isLogged}>
                                <NewAdvertPage isLogged={isLogged} />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/'
                        element={
                            isLogged ? (
                                <Navigate to='/adverts' />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route path='/404' element={<div>404 | Not found</div>} />
                    <Route path='*' element={<Navigate to='/404' />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
