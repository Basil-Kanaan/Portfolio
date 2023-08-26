import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

const ProjectCard = ({ project }) => {
    return (
        <Card
            sx={{
                width: 280,
                height: 380,
                m: 2,
                boxShadow: '0 0 10px rgba(100, 100, 100, 0.7)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
                },
            }}
        >
            <CardActionArea
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{height: '100%', display: "flex", flexDirection: "column"}}
            >

                <CardMedia
                    component="img"
                    src={project.image}
                    alt={project.title}
                    height={"70%"}
                />

                <CardContent
                    sx={{
                        flex: 1,
                        backgroundColor: '#c6c5b9', textAlign: 'center',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{project.title}</Typography>
                    <Typography>{project.description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
