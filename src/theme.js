import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins',
        color: '#ffffff',
        h1: {
            fontSize: '5rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)',
        },
        h2: {
            color: 'white',
            fontSize: '4rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
        },
        h3: {
            color: "#4DA1FF",
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: '2rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        },
        h4: {
            fontSize: '2rem',
        },
        body3: {
            fontSize: '1.5rem',
        }
    },
});

export default theme;
