import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useInView} from 'react-intersection-observer';

const AboutMe = () => {

    const paragraphVariants = {
        hiddenL: {opacity: 0, x: -50},
        hiddenR: typeof window !== 'undefined' && window.innerWidth >= 960 ? {opacity: 0, x: 50} : {opacity: 0, x: 0},
        hiddenD: {opacity: 0, y: 50},
        hiddenU: {opacity: 0, y: -50},
        hidden: {opacity: 0},
        visible: {opacity: 1, x: 0, y: 0},
    };

    const [ref1, inView1] = useInView({ threshold: .5 });
    const [ref2, inView2] = useInView({ threshold: .5 });
    const [ref3, inView3] = useInView({ threshold: .5 });
    const [ref4, inView4] = useInView({
        // require most of the paragraph to be in view
        threshold: .85,
        // shrink the bottom of the viewport so it fires later as you scroll
        rootMargin: '0px 0px 0px 0px',
    });
    const [ref5, inView5] = useInView({ threshold: 1 });

    // Shared responsive body text styling for the middle paragraphs
    const bodyTextSx = {
        color: 'rgba(234,238,243,0.92)',
        fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
        lineHeight: 1.7,
    };

    return (
        <div
            style={{
                // lighter, more consistent spacing on mobile; same feel on desktop
                paddingTop: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0, 0, 0, 0) 50%)',
            }}
        >
            <Container
                sx={{
                    px: { xs: 2.5, sm: 3, md: 5 },
                    py: { xs: 5, md: 7 }, // responsive vertical padding
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ textAlign: 'center', maxWidth: 900, width: '100%' }}>
                    <motion.div
                        ref={ref1}
                        variants={paragraphVariants}
                        initial="hidden"
                        animate={inView1 ? 'visible' : 'hidden'}
                        transition={{duration: 1}}
                    >
                        <Typography variant={"h2"} sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 800 }}>
                            About Me
                        </Typography>

                        <Typography
                            variant={"h3"}
                            sx={{ mt: 0.5, fontSize: { xs: '1.25rem', md: '1.6rem' }, fontWeight: 700, color: '#4DA1FF' }}
                        >
                            Here to serve and inspire.
                        </Typography>
                    </motion.div>

                    <Box sx={{ height: { xs: 16, md: 24 } }} />

                    <motion.div
                        ref={ref2}
                        variants={paragraphVariants}
                        initial="hiddenL"
                        animate={inView2 ? 'visible' : 'hiddenL'}
                        transition={{duration: 1}}
                        style={{textAlign: 'left'}}
                    >
                        <Typography variant={"body3"} sx={bodyTextSx}>
                            Hi, I’m a software engineer. I build clean, fast products — from websites to AI-powered tools.
                        </Typography>
                    </motion.div>

                    <Box sx={{ height: { xs: 16, md: 24 } }} />

                    <motion.div
                        ref={ref3}
                        variants={paragraphVariants}
                        initial="hiddenL"
                        animate={inView3 ? 'visible' : 'hiddenL'}
                        transition={{duration: 1}}
                        style={{textAlign: 'left'}}
                    >
                        <Typography variant={"body3"} sx={bodyTextSx}>
                            My focus is practical: AI orchestration and serverless systems that make your life easier.
                            We’ll keep things simple and turn ideas into reality.
                        </Typography>
                    </motion.div>

                    <Box sx={{ height: { xs: 16, md: 24 } }} />

                    <motion.div
                        ref={ref4}
                        variants={paragraphVariants}
                        initial="hiddenL"
                        animate={inView4 ? 'visible' : 'hiddenL'}
                        transition={{duration: 1}}
                        style={{textAlign: 'left'}}
                    >
                        <Typography variant={"body3"} sx={bodyTextSx}>
                            Beyond code, I’m a partner you can trust — clear communication, steady delivery, and integrity from start to finish.
                        </Typography>
                    </motion.div>

                    <Box sx={{ height: { xs: 16, md: 24 } }} />

                    <motion.div
                        ref={ref5}
                        variants={paragraphVariants}
                        initial="hiddenD"
                        animate={inView5 ? 'visible' : 'hiddenD'}
                        transition={{duration: 0.5}}
                    >
                        <Typography variant={"h4"} sx={{color: "lightblue", fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 700 }}>
                            Let’s get started!
                        </Typography>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ThumbUpAltIcon sx={{fontSize: { xs: '3.75rem', md: '5rem' }, mr: .5, color: '#4DA1FF'}}/>
                            <CheckCircleIcon sx={{fontSize: { xs: '3.75rem', md: '5rem' }, color: '#4DA1FF'}}/>
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </div>
    );
};

export default AboutMe;
