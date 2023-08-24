import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

const ProductCard = ({ project }) => {
    return (
        <Card
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
                {/*TODO: MAKE SURE TO REMOVE THIS AND ADD PROPER IMAGES FOR SERVICES*/}
                {project.image === '' ? (
                    <CardMedia
                        component="div"
                        sx={{
                            background: 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(21,24,52,1) 50%)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            width: '100%',
                        }}
                    >
                        {project.icon}
                    </CardMedia>
                ) : (
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
                )}

                <CardContent sx={{
                    height: "5rem"
                }}>
                    <Typography variant="h6">{project.title}</Typography>
                    <Typography>{project.description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
