import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ProductCard from "./ProductCard";

const serviceData = [
    {
        title: 'Full Stack Development',
        description: 'Crafting dynamic and responsive web applications.',
        icon: <WebIcon fontSize="large"/>,
        image: ''
    },
    {
        title: 'Video Editing',
        description: 'Creating engaging and captivating video content.',
        icon: <VideoLabelIcon fontSize="large"/>,
        image: ''
    },
    {
        title: 'Mobile App Development',
        description: 'Designing and developing intuitive mobile applications.',
        icon: <MobileFriendlyIcon fontSize="large"/>,
        image: ''
    },
];

const ServicesSection = () => {
    return (
        <Container sx={{py: 8}}>
            <Typography variant="h4" align="center" sx={{mb: 4, fontSize: "3rem"}}>
                Services
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {serviceData.map((service, index) => (
                    <ProductCard key={index} project={service} />
                ))}
            </Box>
        </Container>
    );
};

export default ServicesSection;
