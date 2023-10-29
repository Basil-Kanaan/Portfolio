import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    useScrollTrigger,
    useMediaQuery, IconButton,
} from '@mui/material';
import {
    Home as HomeIcon,
    Info as InfoIcon,
    Work as WorkIcon,
    MailOutline as MailOutlineIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const trigger = useScrollTrigger({
        threshold: 0,
        disableHysteresis: true,
    });

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const renderLinks = () => {
        if (isSmallScreen) {
            return (
                <>
                    <IconButton
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('about-section')}
                        className="navbar-link"
                    >
                        <InfoIcon />
                    </IconButton>
                    <IconButton
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('services-section')}
                        className="navbar-link"
                    >
                        <WorkIcon />
                    </IconButton>
                    <IconButton
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('projects-section')}
                        className="navbar-link"
                    >
                        <WorkIcon />
                    </IconButton>
                    <IconButton
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('contact-section')}
                        className="navbar-link"
                    >
                        <MailOutlineIcon />
                    </IconButton>
                </>
            );
        } else {
            return (
                <>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={scrollToTop}
                        className="navbar-link"
                    >
                        Home
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('about-section')}
                        className="navbar-link"
                    >
                        About
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('services-section')}
                        className="navbar-link"
                    >
                        Services
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('projects-section')}
                        className="navbar-link"
                    >
                        Projects
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/"
                        onClick={() => scrollToSection('contact-section')}
                        className="navbar-link"
                    >
                        Contact
                    </Typography>
                </>
            );
        }
    };

    return (
        <AppBar
            position="fixed"
            className={`navbar ${trigger ? 'scrolled' : ''}`}
            sx={{
                background: !trigger
                    ? 'rgba(0,0,0,0)'
                    : 'rgb(0,0,0)',
                boxShadow: !trigger ? 'none' : 'true',
                transition: 'background-color 0.3s ease-in-out',
            }}
        >
            <Toolbar className="navbar">
                <RouterLink to="/" onClick={scrollToTop} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <HomeIcon className="home-icon" />
                </RouterLink>

                <Box className="nav-links" sx={{ marginLeft: 'auto' }}>
                    {renderLinks()}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
