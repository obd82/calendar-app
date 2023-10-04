import { Navigate, Outlet } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

function PrivateRoute() {
    const sessionCurrentUser = JSON.parse(sessionStorage.getItem("user"));
    const localCurrentUser = JSON.parse(localStorage.getItem("user"))

    if (!localCurrentUser && !sessionCurrentUser) {
        notifications.show({
            color: 'red',
            message: "Login First",
            position: 'top-right'
        })
        return <Navigate to="login" />;
    }
    return <Outlet />;
};

export default PrivateRoute;
