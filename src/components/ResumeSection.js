import React from 'react';
import {Button, Container, Typography} from '@mui/material';

const ResumeSection = () => {
    return (
        <Container sx={{py: 8}}>
            <Typography variant="h4" align="center" sx={{mb: 4, fontSize: "3rem"}}>
                Resume
            </Typography>
            <Button variant="contained" color="primary" href="Software-Engineer-Resume.pdf" target="_blank">
                Download Resume
            </Button>
        </Container>
    );
};

export default ResumeSection;
