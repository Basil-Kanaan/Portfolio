import React from 'react';
import {Box, Container, Divider, Typography} from '@mui/material';
import battleRoyaleImage from '../assets/images/2D-BattleRoyale.png';
import apexNodeImage from '../assets/images/ApexNode.png';
import optimizerAppImage from '../assets/images/TimetableOptimizer.png';
import ProjectCard from "./ProjectCard";

const projectData = [
    {
        title: '2D-BattleRoyale',
        description: 'A thrilling 2D Battle Royale game with intense gameplay.',
        link: 'https://bb0lt.github.io/2D-BattleRoyale',
        image: battleRoyaleImage, // Use the imported image
    },
    {
        title: 'ApexNode',
        description: 'Outsourcing company with tiered workforce.',
        link: 'https://bb0lt.github.io/ApexNode-public',
        image: apexNodeImage, // Import the image
    },
    {
        title: 'Timetable Optimizer',
        description: 'Android App for generating UofT Timetable Schedules.',
        link: 'https://play.google.com/store/apps/details?id=com.github.Bb0lt.utmtimetablebuilder',
        image: optimizerAppImage, // Import the image
    },
    // Add more projects
];

const ProjectsSection = () => {
    return (
        <div
            style={{
                paddingTop: '5rem'
            }}
        >
            <Container
                sx={{
                    p: 5,
                    mb: 10,
                    minHeight: '70vh',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant={"h2"}>
                    Projects
                </Typography>
                <Typography variant={"h3"}>
                    Click to View!
                </Typography>
                <Divider sx={{mt: 4, background: "gray", width: '40%', mb: 4}}/>

                <br/>
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
