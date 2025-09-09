import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ServiceCard = ({ project }) => {
    return (
        <Card
            sx={{
                flex: '1 1 250px',
                maxWidth: 320,
                borderRadius: 3,
                overflow: 'hidden',
                // brighter surface: light glass over the dark video
                background:
                    'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.08) 100%), rgba(13,20,38,0.55)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 12px 32px rgba(13,20,38,0.35)',
                backdropFilter: 'blur(6px)',
                transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: 'rgba(77,161,255,0.35)',
                    boxShadow: '0 18px 40px rgba(13,20,38,0.5)',
                },
            }}
        >
            <CardContent sx={{ textAlign: 'center' }}>
                {/* Top section — fixed height for consistency */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 120,
                        mb: 2,
                    }}
                >
                    {project.icon}
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                        {project.title}
                    </Typography>
                </Box>

                {/* Description */}
                <Typography variant="body2" sx={{ color: 'rgba(234,238,243,0.92)' }}>
                    {project.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
