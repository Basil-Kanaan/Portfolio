import React from 'react';
import {Box, IconButton, Link} from '@mui/material';
import {Email, GitHub, LinkedIn} from "@mui/icons-material";

const SideBar = () => {
    const iconSize = '2rem';
    const iconColor = 'white';
    const sidebarHeight = '50%';

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
                transition: 'transform 0.3s, background 0.3s',
                transform: `translateY(-${sidebarHeight})`, // Translate up by 50% of sidebar height
                borderRadius: '15px', // Rounded corners
                '&:hover': {
                    background: 'rgba(0, 0, 0, 0.3)',
                    transform: `translateY(calc(-${sidebarHeight} + 10px)) scale(1.05)`, // Adjusted translation
                },
            }}
        >
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
