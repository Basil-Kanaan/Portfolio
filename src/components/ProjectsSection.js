import React from 'react';
import {Box, Container, Divider, Typography} from '@mui/material';
import battleRoyaleImage from '../assets/images/2D-BattleRoyale.png';
import optimizerAppImage from '../assets/images/TimetableOptimizer.png';
import unlockAIImage from '../assets/images/OneChat.png';

import ProjectCard from "./ProjectCard";

const projectData = [
    {
        title: 'UnlockAI',
        description: 'Multi-agent chat with integrations + one-click automations for businesses.',
        link: 'https://www.useunlock.ai',
        image: unlockAIImage, // replace with unlockAIImage when you add it
    },
    {
        title: '2D-BattleRoyale',
        description: 'A thrilling 2D Battle Royale game with intense gameplay.',
        link: 'https://basil-kanaan.github.io/2D-BattleRoyale',
        image: battleRoyaleImage,
    },
    {
        title: 'Timetable Optimizer',
        description: 'Android app for generating UofT timetable schedules.',
        link: undefined,
        image: optimizerAppImage,
    },
];

const ProjectsSection = () => {
    return (
        <div>
            <Container
                sx={{
                    p: 5,
                    minHeight: '70vh',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant={"h2"}>
                    Projects
                </Typography>
                <Typography variant={"h3"}>
                    Click to View!
                </Typography>
                <Divider sx={{mt: 4, background: "gray", width: '40%', mb: 2}}/>

                <Typography variant="h5" sx={{ m:4, color: "lightblue", display: 'flex', fontWeight: 'bold'}}>
                    Featured
                </Typography>

                <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                    {projectData.map((project, index) => (
                        <ProjectCard key={index} project={project}/>
                    ))}
                </Box>
            </Container>
        </div>
    );
};

export default ProjectsSection;
