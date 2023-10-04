import React from 'react';
import '@testing-library/react';
import '@testing-library/jest-dom';
import { render, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit'
import '../__mocks__/matchMedia';
import userReducer from '../redux/user/userSlice';
import calendarReducer from '../redux/event/eventSlice';

const customRender = (ui, {
    preloadedState = {},
    store = configureStore({
        reducer: {
            authState: userReducer,
            calendarState: calendarReducer
        },
        preloadedState
    }),
    ...renderOptions
} = {}) => {
    const Wrapper = ({ children }) => {
        return (
            <Provider store={store}>
                <MantineProvider>
                    {children}
                </MantineProvider>
            </Provider>
        )
    };
    return ({ store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) })
};

// re-export everything
export * from '@testing-library/react';

// override render method & other helper packages
export { customRender as render, userEvent, renderHook, act };

const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
