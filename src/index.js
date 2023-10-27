import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import App from './App'; // Your main app component
import customTheme from './theme'; // Import the custom theme

ReactDOM.render(
    <ThemeProvider theme={customTheme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>,
    document.getElementById('root')
);
