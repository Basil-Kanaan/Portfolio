import React from 'react';
import {AppBar, Box, Toolbar, Typography, useScrollTrigger,} from '@mui/material';
import {Home as HomeIcon} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';

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

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: !trigger
                    ? 'rgba(0,0,0,0)'
                    : 'rgb(0,0,0)',
                boxShadow: 'none',
                transition: 'background-color 0.3s ease-in-out',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <RouterLink
                    to="/"
                    onClick={scrollToTop}
                    style={{textDecoration: 'none', cursor: 'pointer'}}
                >
                    <HomeIcon
                        sx={{fontSize: '2rem', color: 'white'}}
                    />
                </RouterLink>

                <Box sx={{display: 'flex', gap: '2rem'}}>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('about-section')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            transition: 'opacity 0.3s ease-in-out',
                            '&:hover': {
                                color: 'lightblue', // Change the color on hover
                            },
                        }}
                    >
                        About
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('services-section')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            transition: 'opacity 0.3s ease-in-out',
                            '&:hover': {
                                color: 'lightblue', // Change the color on hover
                            },
                        }}
                    >
                        Services
                    </Typography>

                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('projects-section')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            transition: 'opacity 0.3s ease-in-out',
                            '&:hover': {
                                color: 'lightblue', // Change the color on hover
                            },
                        }}
                    >
                        Projects
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('contact-section')}
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            transition: 'opacity 0.3s ease-in-out',
                            '&:hover': {
                                color: 'lightblue', // Change the color on hover
                            },
                        }}
                    >
                        Contact
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
