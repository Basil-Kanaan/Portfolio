import React from 'react';
import {Box, Container, Typography} from '@mui/material';

const FullStackDev = () => {
    return (
        <Container sx={{marginTop: 4}}>
            <Typography variant="h4" gutterBottom>
                Elevate Your Online Presence with Our Web Development Services
            </Typography>
            <Box sx={{marginY: 2}}>
                <Typography variant="h5" gutterBottom>
                    Limited Time Offer: Simple One-Page Website Package
                </Typography>
                <Typography variant="body1" gutterBottom>
                    🌟 Starting at $400
                </Typography>
                <Typography variant="body1" gutterBottom>
                    - Hero, About Me, Special, Contact sections
                </Typography>
                <Typography variant="body1" gutterBottom>
                    - Customized to your preferences
                </Typography>
            </Box>
            <Box sx={{marginY: 2}}>
                <Typography variant="body1" gutterBottom>
                    🔒 Special Launch Deal: Domain setup and hosting for $100
                </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
                Why Choose Us?
            </Typography>
            <Box sx={{marginY: 2}}>
                <Typography variant="body1" gutterBottom>
                    ✅ Swift: Site ready in 1 day
                </Typography>
                <Typography variant="body1" gutterBottom>
                    ✅ Affordable: Introductory pricing
                </Typography>
                <Typography variant="body1" gutterBottom>
                    ✅ Tailored: Your unique touch
                </Typography>
                <Typography variant="body1" gutterBottom>
                    ✅ Comprehensive: We handle domain and hosting
                </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
                Sections Explained:
            </Typography>
            <Box sx={{marginY: 2}}>
                <Typography variant="body1" gutterBottom>
                    <strong>Hero Section:</strong> The first and most prominent section of your website, where you can
                    showcase the most important information and capture visitors' attention right away.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>About Me Section:</strong> This section is where you can introduce yourself, explain who you
                    are, your background, skills, and expertise. It helps visitors connect with you on a personal level.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Special Section:</strong> This section can be customized to your preferences. It's a
                    versatile space where you can showcase services, projects, images, or any other content you'd like
                    to highlight.
                </Typography>
            </Box>
            <Box sx={{textAlign: 'center'}}>
                <Typography variant="body1">
                    Ready to elevate your online identity? Contact us at{' '}
                    <a href="mailto:basil.kanaan@alumni.utoronto.ca">basil.kanaan@alumni.utoronto.ca</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default FullStackDev;
