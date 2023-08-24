import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ResumeSection = () => {
    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                My Resume
            </Typography>
            <Button variant="outlined" color="primary" href="Software-Engineer-Resume.pdf" target="_blank">
                Download Resume
            </Button>
        </Container>
    );
};

export default ResumeSection;
