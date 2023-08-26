import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import battleRoyaleImage from '../assets/images/2D-BattleRoyale.png';
import apexNodeImage from '../assets/images/ApexNode.png';
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
    // Add more projects
];

const ProjectsSection = () => {
    return (
        <Container sx={{py: 8}}>
            <Typography variant="h4" align="center" sx={{mb: 4, fontSize: "3rem"}}>
                Projects
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {projectData.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </Box>
        </Container>
    );
};

export default ProjectsSection;
