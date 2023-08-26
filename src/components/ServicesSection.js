import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ServiceCard from "./ServiceCard";

const serviceData = [
    {
        title: 'Full Stack Development',
        description: 'Crafting dynamic and responsive web applications.',
        icon: <WebIcon fontSize="large" style={{ color: 'white' }} />,
        image: ''
    },
    {
        title: 'Video Editing',
        description: 'Creating engaging and captivating video content.',
        icon: <VideoLabelIcon fontSize="large" style={{ color: 'white' }} />,
        image: ''
    },
    {
        title: 'Mobile App Development',
        description: 'Designing and developing intuitive mobile applications.',
        icon: <MobileFriendlyIcon fontSize="large" style={{ color: 'white' }} />,
        image: ''
    },
];

const ServicesSection = () => {
    return (
        <Container
            sx={{
                py: 8,
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontSize: "4rem", fontWeight: "bold", textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)' }}>
                    Services
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'gray', mt: 2, fontSize: '1.5rem', fontStyle: 'italic', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)' }}>
                    Quality Innovation, <br/> Building Trust in Every Line of Code.
                </Typography>
            </Box>
            <Divider sx={{ background:"gray",  width: '40%', mb: 4 }} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                {serviceData.map((service, index) => (
                    <ServiceCard key={index} project={service} />
                ))}
            </Box>
        </Container>
    );
};

export default ServicesSection;
