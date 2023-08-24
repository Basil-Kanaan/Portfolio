import React from 'react';
import {Box, Container, IconButton, Link, Typography} from '@mui/material';
import {GitHub, LinkedIn} from '@mui/icons-material';

const ContactSection = () => {
    const iconSize = '3rem';
    const iconColor = 'white';

    return (
        <Container sx={{py: 8}}>
            <Typography variant="h4" align="center" sx={{mb: 4, fontSize: "3rem"}}>
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
            </Box>
            <Typography variant="body1" sx={{m: 2}}>
                Email: <Link href="mailto:basil.kanaan@mail.utoronto.ca">basil.kanaan@mail.utoronto.ca</Link>
            </Typography>
        </Container>
    );
};

export default ContactSection;
