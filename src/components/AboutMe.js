import React, {useEffect, useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AboutMe = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const paragraphVariants = {
        hiddenL: {opacity: 0, x: -50},
        hiddenR:  window.innerWidth >= 960 ? { opacity: 0, x: 50 } : { opacity: 0, x: 0 },
        hiddenD: {opacity: 0, y: 50},
        hiddenU: {opacity: 0, y: -50},
        hidden: {opacity: 0},
        visible: {opacity: 1, x: 0, y: 0}
    };

    return (
        <Container
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{textAlign: 'center', p: "4rem"}}>
                <motion.div
                    variants={paragraphVariants}
                    initial="hidden"
                    animate={scrollY > window.innerHeight / 1.5 - 200 ? "visible" : "hidden"}
                    transition={{duration: 1}}
                >
                    <Typography variant="h1" sx={{ mt:4, mb: 2, fontSize: "4rem", fontWeight: "bold", textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)' }}>
                        About Me
                    </Typography>

                    <div>
                        <Typography variant="h2" sx={{
                            color: "#4DA1FF",
                            fontWeight: 'bold',
                            fontSize: '2rem',
                            lineHeight: 1.6,
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                        }}>
                            <i>Here to serve and inspire.</i>
                            <br/><br/>
                        </Typography>
                    </div>

                    <motion.div
                        variants={paragraphVariants}
                        initial="hiddenU"
                        animate={scrollY > window.innerHeight / 1.5 ? "visible" : "hiddenU"}
                        transition={{ duration: 1 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div>
                            Hi! <br/>
                            I'm a software engineer.
                            <br/> I make websites.
                        </div>
                    </motion.div>

                    <br /><br />
                    <motion.div
                        variants={paragraphVariants}
                        initial="hiddenL"
                        animate={scrollY > window.innerHeight / 1.5 + 200 ? "visible" : "hiddenL"}
                        transition={{ duration: 1 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div>
                            My journey is fueled by a relentless drive to deliver excellence. I believe in the
                            power of technology to transform ideas into reality, and I take pride in building reliable
                            and robust software that stands the test of time.
                        </div>
                    </motion.div>
                    <br /><br />
                    <motion.div
                        variants={paragraphVariants}
                        initial="hiddenR"
                        animate={scrollY > window.innerHeight / 1.5 + 400 ? "visible" : "hiddenR"}
                        transition={{ duration: 1 }}
                    >
                        <div>
                            Beyond code, I am driven by a commitment to trustworthiness and dependability.
                            Clients and collaborators can rely on me to bring their visions to life with unwavering
                            dedication and integrity. Let's work together to turn possibilities into reality!
                        </div>
                    </motion.div>
                </motion.div>
                <br/><br/>
                <motion.div
                    variants={paragraphVariants}
                    initial="hiddenD"
                    animate={scrollY > window.innerHeight / 1.5 + 600 ? "visible" : "hiddenD"}
                    transition={{duration: 0.5}}
                >
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <ThumbUpAltIcon sx={{fontSize: '8rem', marginRight: '0.5rem', color: '#4DA1FF'}}/>
                        <CheckCircleIcon sx={{fontSize: '8rem', color: '#4DA1FF'}}/>
                    </Box>
                </motion.div>
            </Box>
        </Container>
    );
};

export default AboutMe;
