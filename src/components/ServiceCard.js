import React, {useState} from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, Typography,} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServiceCard = ({project}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        if (project.details) {
            setIsPopupOpen(!isPopupOpen)
        }
    };

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
                onClick={togglePopup}
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
                <CardMedia
                    component="div"
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(57,116,133,1) 0%, rgba(21,24,52,1) 100%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70%',
                        width: '100%',
                    }}
                >
                    {project.icon}
                </CardMedia>

                <CardContent
                    sx={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        textAlign: 'center',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
                    }}
                >
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {project.title}
                    </Typography>
                    <Typography>{project.description}</Typography>
                    {project.details && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ExpandMoreIcon/>
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
            <Dialog open={isPopupOpen} onClose={togglePopup} maxWidth="md" fullWidth>
                <DialogContent>
                    {project.details}
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ServiceCard;
