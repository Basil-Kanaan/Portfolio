import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Box,
} from '@mui/material';

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
                // Dark, slightly translucent gradient like your Services cards
                background: 'linear-gradient(180deg, rgba(10,15,31,0.88) 0%, rgba(16,24,44,0.92) 100%)',
                color: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.45)',
                transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 18px 35px rgba(0,0,0,0.6)',
                    borderColor: 'rgba(77,161,255,0.35)', // subtle blue glow
                },
            }}
        >
            <CardActionArea
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
            >
                {/* MEDIA */}
                {hasImage ? (
                    <CardMedia
                        component="img"
                        src={project.image}
                        alt={project.title}
                        sx={{
                            height: 200,               // fixed visual rhythm
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}
                    />
                ) : (
                    // Graceful placeholder if no image (e.g., UnlockAI)
                    <Box
                        sx={{
                            height: 200,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            background:
                                'radial-gradient(120% 120% at 50% 0%, rgba(77,161,255,0.20) 0%, rgba(13,20,38,0.85) 60%, rgba(10,15,31,0.95) 100%)',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.4 }}>
                            {project.title}
                        </Typography>
                    </Box>
                )}

                {/* CONTENT */}
                <CardContent
                    sx={{
                        flex: 1,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1,
                        textAlign: 'center',
                        // darker inner surface instead of white slab
                        background:
                            'linear-gradient(180deg, rgba(9,14,27,0.6) 0%, rgba(9,14,27,0.9) 100%)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, lineHeight: 1.2, color: 'white' }}
                    >
                        {project.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: 'rgba(207,216,220,0.92)' }}
                    >
                        {project.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
