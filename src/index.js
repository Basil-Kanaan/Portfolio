import React from 'react';
import {createRoot} from 'react-dom/client';
import {CssBaseline, ThemeProvider} from '@mui/material';
import App from './App'; // Your main app component
import customTheme from './theme'; // Import the custom theme

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);
