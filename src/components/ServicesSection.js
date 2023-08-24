import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';

const serviceData = [
    {
        title: 'Full Stack Web Development',
        description: 'Crafting dynamic and responsive web applications.',
        icon: <WebIcon fontSize="large" />,
    },
    {
        title: 'Video Editing',
        description: 'Creating engaging and captivating video content.',
        icon: <VideoLabelIcon fontSize="large" />,
    },
    {
        title: 'Mobile App Development',
        description: 'Designing and developing intuitive mobile applications.',
        icon: <MobileFriendlyIcon fontSize="large" />,
    },
];

const ServicesSection = () => {
    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                My Services
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {serviceData.map((service, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 280,
                            height: 380,
                            m: 2,
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
                                component="div"
                                sx={{
                                    background: 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(21,24,52,1) 50%)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    width: '100%'
                                }}
                            >
                                {service.icon}
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6">{service.title}</Typography>
                                <Typography>{service.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default ServicesSection;
