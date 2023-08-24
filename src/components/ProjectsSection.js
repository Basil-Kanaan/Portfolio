import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import battleRoyaleImage from '../assets/images/2D-BattleRoyale.png'; // Update the import path

const projectData = [
    {
        title: '2D-BattleRoyale',
        description: 'A thrilling 2D Battle Royale game with intense gameplay.',
        link: 'https://bb0lt.github.io/2D-BattleRoyale',
        image: battleRoyaleImage, // Use the imported image
    },
    {
        title: 'ApexNode',
        description:
            'A company specializing in outsourcing services like app and website development.',
        link: 'https://bb0lt.github.io/ApexNode-public',
        image: "", // Import the image
    },
    // Add more projects
];

const ProjectsSection = () => {
    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" sx={{ mb: 4, fontSize: "3rem" }}>
                Projects
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {projectData.map((project, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 280,
                            height: 380,
                            m: 2,
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <CardActionArea
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                            >
                                <img src={project.image} alt={project.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6">{project.title}</Typography>
                                <Typography>{project.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default ProjectsSection;
