import React from 'react';
import {Box, Container, Divider, Typography} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ServiceCard from "./ServiceCard";
import FullStackDev from "./ServiceComponents/FullStackDev";

const serviceData = [
    {
        title: 'Full Stack Development',
        description: 'Crafting dynamic and responsive web applications.',
        icon: <WebIcon fontSize="large" style={{color: 'white'}}/>,
        details: <FullStackDev/>
    },
    {
        title: 'Video Editing',
        description: 'Creating engaging and captivating video content.',
        icon: <VideoLabelIcon fontSize="large" style={{color: 'white'}}/>,
    },
    {
        title: 'Mobile App Development',
        description: 'Designing and developing intuitive mobile applications.',
        icon: <MobileFriendlyIcon fontSize="large" style={{color: 'white'}}/>,
    },
];

const ServicesSection = () => {
    return (
        <div
            style={{
                paddingTop: '3rem'
            }}
        ><Container
            sx={{
                p: 5,
                minHeight: '50vh',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box sx={{textAlign: 'center', mb: 4}}>
                <Typography variant={"h2"}>
                    Services
                </Typography>
                <Typography variant={"h3"}>
                    Quality Innovation.
                </Typography>
            </Box>
            <Divider sx={{background: "gray", width: '40%', mb: 4}}/>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                {serviceData.map((service, index) => (
                    <ServiceCard key={index} project={service}/>
                ))}
            </Box>
        </Container>
        </div>

    );
};

export default ServicesSection;
