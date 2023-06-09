import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const isLogged = useSelector((state) => state.auth);
    console.log(isLogged)

    if (!isLogged) {
        return <Navigate to='/login' state={{ from: location }} />;
    }
    return children;
};

export default RequireAuth;
