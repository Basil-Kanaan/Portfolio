import React from 'react';
import {Box, IconButton, Link, useMediaQuery, useScrollTrigger} from '@mui/material';
import {Email, GitHub, Instagram, LinkedIn} from "@mui/icons-material";
import './SideBar.css';

const SideBar = () => {
    const iconSize = '2rem';
    const iconColor = 'white';
    const sidebarHeight = '50%';

    const trigger = useScrollTrigger({
        threshold: 0,
        disableHysteresis: true,
    });

    const sendEmail = () => {
        window.location.href = "mailto:basil.kanaan@alumni.utoronto.ca";
    };

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (isSmallScreen) {
        return null;
    }

    return (
        <Box
            className={`sidebar-container ${trigger ? 'hidden' : ''} hide-on-small-screen`}
            sx={{
                position: 'fixed',
                top: '50%',
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0)',
                transition: 'opacity 0.3s, transform 0.3s, background 0.3s',
                opacity: trigger ? 0 : 1,
                pointerEvents: trigger ? 'none' : 'auto',
                transform: `translateY(-${sidebarHeight})`, // Translate up by 50% of sidebar height
                borderRadius: '15px', // Rounded corners
                '&:hover': {
                    background: 'rgba(0, 0, 0, 0.3)',
                    transform: `scale(1.05) translateY(calc(-${sidebarHeight} + 10px))`,
                },
            }}
        >
            <IconButton
                component={Link}
                href="https://www.instagram.com/basil.dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                sx={{m: 1}}

            >
                <Instagram className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
            <IconButton
                component={Link}
                href="https://www.linkedin.com/in/basil-kanaan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{m: 1}}
                className={"sidebar-link"}
            >
                <LinkedIn className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
            <IconButton
                component={Link}
                href="https://github.com/basil-kanaan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{m: 1}}
                className={"sidebar-link"}
            >
                <GitHub className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
            <IconButton
                aria-label="Email"
                sx={{m: 1}}
                onClick={sendEmail}
                className={"sidebar-link"}
            >
                <Email className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
        </Box>
    );
};

export default SideBar;
