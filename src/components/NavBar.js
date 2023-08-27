import React from 'react';
import { AppBar, Box, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material'; // Import the Home icon
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
    const trigger = useScrollTrigger({
        threshold: 0,
        disableHysteresis: true,
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const scrollToNextSection = () => {
        if (window.location.pathname === '/Portfolio/projects') {
            setTimeout(() => {
                window.scrollTo({
                    top: window.innerHeight*2,
                    behavior: 'smooth',
                });
            }, 100); // Delay for 1 second
        } else {
            window.scrollTo({
                top: window.innerHeight*2,
                behavior: 'smooth',
            });
        }
    };


    return (
        <AppBar position="fixed" sx={{
            background: !trigger ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)',
            boxShadow: 'none',
            transition: 'background-color 0.3s ease-in-out',
        }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RouterLink to="/" onClick={scrollToTop} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <HomeIcon sx={{ fontSize: '2rem', color: 'white' }} />
                </RouterLink>
                <Box sx={{ display: 'flex', gap: '2rem' }}>
                    <Typography component={RouterLink} variant="body1" to="/" onClick={scrollToNextSection} sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', opacity: !trigger ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
                        Services
                    </Typography>


                    <Typography variant="body1" component={RouterLink} to="/projects" sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', opacity: !trigger ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
                        Projects
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
