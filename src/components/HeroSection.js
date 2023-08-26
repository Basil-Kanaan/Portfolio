import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import suit0 from '../assets/images/suit0.png';
import suit1 from '../assets/images/suit1.png';
import heroVideo from '../assets/videos/heroBG.mp4'; // Import the video file
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const images = [suit1, suit0];

const texts = [
    "UofT Graduate",
    "Software Engineer"
];

const HeroSection = () => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const textIntervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 5000);

        const imageIntervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(textIntervalId);
            clearInterval(imageIntervalId);
        };
    }, []);

    useEffect(() => {
        const targetText = texts[currentIndex];
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            setCurrentText(targetText.substring(0, charIndex));
            charIndex++;

            if (charIndex > targetText.length) {
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [currentIndex]);

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
            }}
        >
            <video
                autoPlay
                muted
                loop
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    opacity: 0.5,
                    objectFit: "cover"
                }}
            >
                <source src={heroVideo} type="video/mp4" />
            </video>
            <img
                src={images[currentImageIndex]}
                alt="Overlay"
                height="94%"
                style={{
                    position: 'absolute',
                    bottom:0,
                    left: "10%",
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 1), transparent 50%)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)',
                }}
            >
                <Typography variant="h3" sx={{ color: '#ffffff', fontSize: "5rem", fontWeight: 'bold' }}>
                    Basil Kanaan
                </Typography>
                <Typography variant="h3" sx={{ color: '#ffffff', fontSize: "2rem"}}>
                    {currentText}
                </Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '65%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}
            >
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}
            >
                <KeyboardDoubleArrowDownIcon
                    sx={{
                        color: '#ffffff',
                        fontSize: '5rem',
                        marginTop: 20,
                        cursor: 'pointer',
                        transition: 'transform 0.3s, font-size 0.3s',
                        '&:hover': {
                            transform: 'scale(1.3)',
                        },
                    }}
                    onClick={scrollToNextSection}
                />
            </Box>
        </Box>
    );
};

export default HeroSection;
