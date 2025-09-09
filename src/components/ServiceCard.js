import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ServiceCard = ({ project }) => {
    return (
        <Card
            sx={{
                flex: '1 1 250px',
                maxWidth: 320,
                borderRadius: 3,
                // add semi-transparent overlay for opacity
                background: 'linear-gradient(180deg, rgba(10,15,31,0.5) 0%, rgba(16,24,44,0.9) 100%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                },
                backdropFilter: 'blur(4px)', // optional: softens the video behind
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
                        minHeight: 120,   // ensures all card tops are same height
                        mb: 2,
                    }}
                >
                    {project.icon}
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                        {project.title}
                    </Typography>
                </Box>

                {/* Description */}
                <Typography variant="body2" sx={{ color: '#cfd8dc' }}>
                    {project.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
