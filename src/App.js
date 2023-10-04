import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';

import { store } from './app/store.js';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';

function App() {
    const navigate = useNavigate();
    const sessionCurrentUser = JSON.parse(sessionStorage.getItem("user"));
    const localCurrentUser = JSON.parse(localStorage.getItem("user"))
    const userNotExist = !localCurrentUser && !sessionCurrentUser;

    useEffect(() => { if (userNotExist) navigate("/login") }, []);
    return (
        <Provider store={store} >
            <MantineProvider>
                <Notifications />
                <Outlet />
            </MantineProvider>
        </Provider>

    );
}

export default App;
