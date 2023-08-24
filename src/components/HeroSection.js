import React, {useState, useEffect, useMemo} from 'react';
import { Box, Button, Typography } from '@mui/material';

const HeroSection = () => {
    const texts = useMemo(
        () => ["Hi, I'm Basil.", "Grad from UofT.", "Highest Distinction.", "Software Engineer."],
        []
    );

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = (currentIndex + 1) % texts.length;
            setCurrentIndex(nextIndex);
        }, 8000);

        return () => clearInterval(intervalId);
    }, [currentIndex, texts]);


    useEffect(() => {
        const targetText = texts[currentIndex];
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            setCurrentText(targetText.substring(0, charIndex));
            charIndex++;

            if (charIndex > targetText.length) {
                clearInterval(typingInterval);
            }
        }, 100); // Type one character every 100 milliseconds

        return () => clearInterval(typingInterval);
    }, [currentIndex, texts]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                backgroundImage: 'url(path_to_background_image.jpg)',
                backgroundSize: 'cover',
            }}
        >
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
            {/* Your image overlay */}
            <img src="path_to_overlay_image.png" alt="Overlay" />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3" sx={{ color: '#ffffff' }}>
                    {currentText}
                </Typography>
                <Button variant="contained" color="primary" href="mailto:basil.kanaan@mail.utoronto.ca">
                    Email Me
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;
