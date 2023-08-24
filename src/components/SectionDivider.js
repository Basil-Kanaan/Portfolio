import React from 'react';
import {Box, Divider} from '@mui/material';
import {Flare} from '@mui/icons-material';

const SectionDivider = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4}}>
            <Divider variant="middle" sx={{width: '30%', backgroundColor: '#bdbdbd'}}/>
            <Flare sx={{fontSize: '2rem', color: '#bdbdbd', mx: 2}}/> {/* Use the Star icon */}
            <Divider variant="middle" sx={{width: '30%', backgroundColor: '#bdbdbd'}}/>
        </Box>
    );
};

export default SectionDivider;
