import React from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { Outlet, RouterProvider } from 'react-router-dom';
import { appRoutes } from 'Routes';

const ProvidersMock = () => {
    return (
        <RouterProvider router={appRoutes}>
            <Provider store={store} >
                <MantineProvider>
                    <Outlet />
                </MantineProvider>
            </Provider>
        </RouterProvider>
    );
};

export default ProvidersMock;
