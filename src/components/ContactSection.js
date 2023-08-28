import React from 'react';
import {Box, Container, IconButton, Link, Typography} from '@mui/material';
import {Email, GitHub, LinkedIn} from '@mui/icons-material';

const ContactSection = () => {
    const iconSize = '3rem';
    const iconColor = 'white';

    const sendEmail = () => {
        window.location.href = "mailto:basil.kanaan@mail.utoronto.ca";
    };

    return (
        <Container sx={{py: 8}}>
            <Typography variant="h1"
                        sx={{fontSize: "4rem", fontWeight: "bold", textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)'}}>
                Contact Me
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <IconButton
                    component={Link}
                    href="https://www.linkedin.com/in/basil-kanaan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    sx={{m: 2}}
                >
                    <LinkedIn sx={{color: iconColor, fontSize: iconSize}}/>
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://github.com/bb0lt"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    sx={{m: 2}}
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
            <Typography variant="body1" sx={{mt: 2, fontSize: "1.5rem", fontWeight: "bold",}}>
                Email:
            </Typography>
            <Link sx={{fontSize: "1.5rem"}}
                  href="mailto:basil.kanaan@mail.utoronto.ca">basil.kanaan@mail.utoronto.ca</Link>
        </Container>
    );
};

export default ContactSection;
