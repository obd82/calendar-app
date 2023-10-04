import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';

import { store } from './app/store.js';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';

function App() {

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
