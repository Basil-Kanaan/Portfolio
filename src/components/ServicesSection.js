import React from 'react';
import {Box, Container, Divider, Typography} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import SmsIcon from '@mui/icons-material/Sms';
import BoltIcon from '@mui/icons-material/Bolt';
import CloudIcon from '@mui/icons-material/Cloud';

import ServiceCard from "./ServiceCard";
import FullStackDev from "./ServiceComponents/FullStackDev";
import xsVideo from "../assets/videos/xs_blue_compress.mp4";

// ORIGINAL 3 (kept) + NEW 3 (added) — each has max 1 short sentence.
const serviceData = [
    {
        title: 'AI Receptionist',
        description: 'Instant WhatsApp/SMS/Voice intake, scheduling, and human handoff.',
        icon: <SmsIcon fontSize="large" style={{color: 'white'}}/>,
    },
    {
        title: 'Integrations & Automations',
        description: 'Connect tools and automate workflows with reliability.',
        icon: <BoltIcon fontSize="large" style={{color: 'white'}}/>,
    },
    {
        title: 'Serverless Delivery',
        description: 'AWS Lambda, Step Functions, and APIs built for scale.',
        icon: <CloudIcon fontSize="large" style={{color: 'white'}}/>,
    },

    {
        title: 'FullStack Dev',
        description: 'Crafting dynamic and responsive web applications.',
        icon: <WebIcon fontSize="large" style={{color: 'white'}}/>,
        details: <FullStackDev/>
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
                    p:5,
                    minHeight: '70vh',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >

                <Box sx={{textAlign: 'center', zIndex: 1}}>
                    <Typography variant={"h2"} sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 800 }}>
                        Services
                    </Typography>
                    <Typography
                        variant={"h3"}
                        sx={{ mt: 0.5, fontSize: { xs: '1.25rem', md: '1.6rem' }, fontWeight: 700, color: '#4DA1FF' }}
                    >
                        Quality Innovation.
                    </Typography>
                </Box>
                <Divider sx={{background: "gray", width: '40%', mt:2, mb: 4, zIndex: 1}}/>
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
