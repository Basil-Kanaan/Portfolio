import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import suit1 from '../assets/images/suit1.png';
import heroVideo from '../assets/videos/heroBG.mp4';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const images = [suit1, suit1];

const texts = [
    "AI Orchestration & Serverless",
    "AI Receptionist Concierge",
    "UofT Graduate",
    "Software Engineer"
];

const BASE_SPEED = 60;   // faster typing
const JITTER = 25;       // ± randomness per char
const PUNCT_PAUSE = 160; // extra pause on ,.!?;:
const END_HOLD = 2000;   // hold 2s after finishing
const FADE_DURATION = 450; // fade-out duration (ms)

const HeroSection = () => {
    const [displayed, setDisplayed] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Typing effect with hold → fade-down → advance
    useEffect(() => {
        const target = texts[currentIndex];
        let i = 0;
        const timeouts = [];

        setDisplayed('');
        setIsFading(false); // show when starting a new line

        const schedule = (fn, delay) => {
            const id = setTimeout(fn, delay);
            timeouts.push(id);
        };

        const typeNext = () => {
            if (i < target.length) {
                const ch = target[i];
                setDisplayed(prev => prev + ch);
                i++;

                let delay = BASE_SPEED + (Math.random() * JITTER - JITTER / 2);
                if (',.!?;:'.includes(ch)) delay += PUNCT_PAUSE;

                schedule(typeNext, delay);
            } else {
                // Finished typing → hold, then fade down, then advance
                schedule(() => {
                    setIsFading(true);
                    schedule(() => {
                        setCurrentIndex(idx => (idx + 1) % texts.length);
                    }, FADE_DURATION);
                }, END_HOLD);
            }
        };

        typeNext();
        return () => timeouts.forEach(clearTimeout);
    }, [currentIndex]);

    // Sync portrait swap with the text cycle
    useEffect(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, [currentIndex]);

    const scrollToNextSection = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <Box sx={{ position: 'relative', height: '100vh' }}>
            {/* Background video */}
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
                    objectFit: 'cover',
                }}
            >
                <source src={heroVideo} type="video/mp4" />
            </video>

            {/* Portrait */}
            <img
                src={images[currentImageIndex]}
                alt="Overlay"
                height="94%"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '10%',
                    zIndex: 0,
                }}
            />

            {/* Dark-to-clear gradient for readability */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,1), transparent 20%)',
                }}
            />

            {/* Typing headline */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)',
                    px: 2,
                    width: '100%',
                }}
            >
                <Typography variant="h1">Basil Kanaan</Typography>

                <Typography
                    variant="h4"
                    sx={{
                        mt: 1,
                        // WRAP long lines nicely on small screens:
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                        maxWidth: { xs: '90vw', md: '70vw' },
                        mx: 'auto',

                        // fade-down transition
                        opacity: isFading ? 0 : 1,
                        transform: isFading ? 'translateY(12px)' : 'translateY(0)',
                        transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease`,
                    }}
                >
                    {displayed}
                    <Box
                        component="span"
                        sx={{
                            ml: 0.5,
                            display: 'inline-block',
                            width: '2px',
                            height: '1.1em',
                            bgcolor: 'white',
                            verticalAlign: 'text-bottom',
                            animation: 'blink 1s steps(2, start) infinite',
                        }}
                    />
                </Typography>

                {/* caret keyframes */}
                <style>{`
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}</style>
            </Box>

            {/* Down arrow */}
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
                        cursor: 'pointer',
                        mb: '20%',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.3)' },
                    }}
                    onClick={scrollToNextSection}
                />
            </Box>
        </Box>
    );
};

export default HeroSection;
