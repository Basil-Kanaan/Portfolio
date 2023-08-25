import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import suit0 from '../assets/images/suit0.png';
import suit1 from '../assets/images/suit1.png';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const images = [suit1, suit0];

const texts = [
    "Hi, I'm Basil.",
    "Grad from UofT.",
    "Software Engineer."
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
            <img
                src={images[currentImageIndex]}
                alt="Overlay"
                height="95%"
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
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 50%)',
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
                <Typography variant="h3" sx={{ color: '#ffffff' }}>
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
                <Button variant="contained" color="primary" href="mailto:basil.kanaan@mail.utoronto.ca">
                    Email Me
                </Button>
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
                            transform: 'scale(1.2)',
                        },
                    }}
                    onClick={scrollToNextSection}
                />
            </Box>
        </Box>
    );
};

export default HeroSection;
