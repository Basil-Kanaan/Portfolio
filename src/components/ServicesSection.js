import React from 'react';
import {Box, Container, Divider, Typography} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ServiceCard from "./ServiceCard";
import FullStackDev from "./ServiceComponents/FullStackDev";
import xsVideo from "../assets/videos/xs_blue_compress.mp4";

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
                position: 'relative',
                background: '#050813',
            }}
        >
            <video
                autoPlay
                muted
                loop
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom:0,
                    height: '100%',
                    width: '100%',
                    opacity: 0.4,
                    objectFit: "cover",
                }}
            >
                <source src={xsVideo} type="video/mp4" />
            </video>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 10%, transparent 90%, rgba(0,0,0,1) 100%)',
                }}
            />
            <Container
            sx={{
                p: 5,
                minHeight: '50vh',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Box sx={{textAlign: 'center', mb: 4, zIndex: 1}}>
                <Typography variant={"h2"}>
                    Services
                </Typography>
                <Typography variant={"h3"}>
                    Quality Innovation.
                </Typography>
            </Box>
            <Divider sx={{background: "gray", width: '40%', mb: 4, zIndex: 1}}/>
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
