import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

import './index.css';
import '@mantine/notifications/styles.css';
import { appRoutes } from './Routes.js';

window.React = React;
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<RouterProvider router={appRoutes} />);
