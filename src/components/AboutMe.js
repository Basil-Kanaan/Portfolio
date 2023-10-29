import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useInView} from 'react-intersection-observer';


const AboutMe = () => {

    const paragraphVariants = {
        hiddenL: {opacity: 0, x: -50},
        hiddenR: window.innerWidth >= 960 ? {opacity: 0, x: 50} : {opacity: 0, x: 0},
        hiddenD: {opacity: 0, y: 50},
        hiddenU: {opacity: 0, y: -50},
        hidden: {opacity: 0},
        visible: {opacity: 1, x: 0, y: 0},
    };


    const [ref1, inView1] = useInView({
        threshold: .5
    });

    const [ref2, inView2] = useInView({
        threshold: .5
    });

    const [ref3, inView3] = useInView({
        threshold: .5
    });

    const [ref4, inView4] = useInView({
        threshold: .5
    });

    const [ref5, inView5] = useInView({
        threshold: 1
    });

    return (
        <div
            style={{
                paddingTop: '3rem',
                background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0, 0, 0, 0) 50%)',
            }}
        >
            <Container
                sx={{
                    p: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <motion.div
                        ref={ref1}
                        variants={paragraphVariants}
                        initial="hidden"
                        animate={inView1 ? 'visible' : 'hidden'}
                        transition={{duration: 1}}
                    >
                        <Typography variant={"h2"}>
                            About Me
                        </Typography>

                        <Typography variant={"h3"}>
                            Here to serve and inspire.
                        </Typography>
                    </motion.div>

                    <br/><br/>

                    <motion.div
                        ref={ref2}
                        variants={paragraphVariants}
                        initial="hiddenL"
                        animate={inView2 ? 'visible' : 'hiddenL'}
                        transition={{duration: 1}}
                        style={{textAlign: 'left'}}
                    >
                        <Typography variant={"body3"}>
                            Hi, I'm a software engineer and I make websites.
                        </Typography>
                    </motion.div>

                    <br/><br/>

                    <motion.div
                        ref={ref3}
                        variants={paragraphVariants}
                        initial="hiddenL"
                        animate={inView3 ? 'visible' : 'hiddenL'}
                        transition={{duration: 1}}
                        style={{textAlign: 'left'}}
                    >
                        <Typography variant={"body3"}>
                            I'm here to make your life easier and turn your ideas into reality. Let's simplify the
                            process and achieve your visions.
                        </Typography>
                    </motion.div>

                    <br/><br/>

                    <motion.div
                        ref={ref4}
                        variants={paragraphVariants}
                        initial="hiddenL"
                        animate={inView4 ? 'visible' : 'hiddenL'}
                        transition={{duration: 1}}
                        style={{textAlign: 'left'}}
                    >
                        <Typography variant={"body3"}>
                            Beyond code, I'm your trusted partner. You can count on me to deliver your projects with
                            dedication and integrity.
                            Saying "yes" to your digital aspirations has never been so easy.
                        </Typography>
                    </motion.div>

                    <br/><br/>

                    <motion.div
                        ref={ref5}
                        variants={paragraphVariants}
                        initial="hiddenD"
                        animate={inView5 ? 'visible' : 'hiddenD'}
                        transition={{duration: 0.5}}
                    >
                        <Typography variant={"h4"} sx={{color: "lightblue"}}>
                            Let's get started!
                        </Typography>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ThumbUpAltIcon sx={{fontSize: '5rem', marginRight: '0.5rem', color: '#4DA1FF'}}/>
                            <CheckCircleIcon sx={{fontSize: '5rem', color: '#4DA1FF'}}/>
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </div>
    );
};

export default AboutMe;
