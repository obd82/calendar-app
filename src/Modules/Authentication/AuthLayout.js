import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
    const navigate = useNavigate();
    const sessionCurrentUser = JSON.parse(sessionStorage.getItem("user"));
    const localCurrentUser = JSON.parse(localStorage.getItem("user"))
    const isLoggedIn = localCurrentUser && sessionCurrentUser;
    useEffect(() => {
        if (isLoggedIn) {
            return navigate('/calendar')
        }
    }, []);
    console.log(isLoggedIn);
    if (isLoggedIn) {
        return <Navigate to="calendar" />;
    }
    return (<Outlet />);
};

export default AuthLayout;