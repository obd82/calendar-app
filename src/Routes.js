import React from 'react'
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import PrivateRoute from './Modules/Authentication/PrivateRoute';
import Login from './Modules/Authentication/Login';
import SignUp from './Modules/Authentication/SignUp';
import ErrorBoundary from './Modules/Error/ErrorBoundary';
import Calendar from './Modules/Calendar/Calendar.page';

export const appRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: "calendar",
                        element: <Calendar />,
                    },

                ]
            },
        ]
    },
]);