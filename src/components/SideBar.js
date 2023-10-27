import React from 'react';
import {Box, IconButton, Link, useScrollTrigger} from '@mui/material';
import {Email, GitHub, Instagram, LinkedIn} from "@mui/icons-material";

const SideBar = () => {
    const iconSize = '2rem';
    const iconColor = 'white';
    const sidebarHeight = '50%';

    const trigger = useScrollTrigger({
        threshold: 0,
        disableHysteresis: true,
    });

    const sendEmail = () => {
        window.location.href = "mailto:basil.kanaan@mail.utoronto.ca";
    };

    return (
        <Box
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
                <Instagram sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
            <IconButton
                component={Link}
                href="https://www.linkedin.com/in/basil-kanaan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{m: 1}}
            >
                <LinkedIn sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
            <IconButton
                component={Link}
                href="https://github.com/bb0lt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{m: 1}}
            >
                <GitHub sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
            <IconButton
                aria-label="Email"
                sx={{m: 1}}
                onClick={sendEmail}
            >
                <Email sx={{color: iconColor, fontSize: iconSize}}/>
            </IconButton>
        </Box>
    );
};

export default SideBar;
