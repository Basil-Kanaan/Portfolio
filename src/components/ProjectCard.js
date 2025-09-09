import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ProjectCard = ({ project }) => {
    const hasImage = Boolean(project.image);

    return (
        <Card
            sx={{
                width: 300,
                height: 380,
                m: 2,
                borderRadius: 3,
                overflow: 'hidden',
                background:
                    'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.10) 100%), rgba(13,20,38,0.50)',
                border: '1px solid rgba(255,255,255,0.20)',
                color: 'rgba(255,255,255,0.95)',
                boxShadow: '0 12px 28px rgba(13,20,38,0.35)',
                transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 18px 42px rgba(13,20,38,0.5)',
                    borderColor: 'rgba(77,161,255,0.38)',
                },
            }}
        >
            <CardActionArea
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                {hasImage ? (
                    <CardMedia
                        component="img"
                        src={project.image}
                        alt={project.title}
                        sx={{
                            height: 200,
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.14)',
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            height: 200,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            background:
                                'radial-gradient(120% 120% at 50% 0%, rgba(77,161,255,0.35) 0%, rgba(13,20,38,0.55) 55%, rgba(10,15,31,0.85) 100%)',
                            borderBottom: '1px solid rgba(255,255,255,0.14)',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
                            {project.title}
                        </Typography>
                    </Box>
                )}

                <CardContent
                    sx={{
                        flex: 1,
                        width: '100%',
                        // center the bottom text both ways
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        textAlign: 'center',
                        background:
                            'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                        {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(234,238,243,0.92)' }}>
                        {project.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
