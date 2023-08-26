import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

const ServiceCard = ({ project }) => {
    return (
        <Card
            sx={{
                width: 280,
                height: 200,
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
                 component="div"
                 sx={{
                 background: 'linear-gradient(to bottom, rgba(57,116,133,1) 0%, rgba(21,24,52,1) 100%)',
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: '70%',
                 width: "100%"
                }}>
                    {project.icon}
             </CardMedia>


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

export default ServiceCard;
