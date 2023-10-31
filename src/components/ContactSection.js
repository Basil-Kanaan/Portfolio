import React, {useState} from 'react';
import {Box, Button, Container, IconButton, Link, Paper, TextField, Typography,} from '@mui/material';
import {Email, GitHub, Instagram, LinkedIn,} from '@mui/icons-material';

const ContactSection = () => {
    const iconSize = '2rem';
    const iconColor = 'white';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        request: '',
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const sendEmail = () => {
        // Construct the email body with form data and send it
        const {name, email, request} = formData;
        const emailBody = `Name: ${name}\nEmail: ${email}\nRequest: ${request}`;
        window.location.href = `mailto:basil.kanaan@mail.utoronto.ca?subject=Contact Request&body=${encodeURIComponent(emailBody)}`;
    };

    return (
        <div style={{background: '#050813'}}>
            <Container
                sx={{
                    p: 5,
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h2" sx={{mb: 5}}>
                    Contact
                </Typography>


                <Paper
                    elevation={5}
                    sx={{
                        padding: '10%',
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                        borderRadius: '12px',
                    }}
                >
                    <Box sx={{mt: 4}}>
                        <Typography variant="h4" sx={{textAlign: "left"}}>
                            Email me
                        </Typography>
                        <form>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                sx={{mt: 2}}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                sx={{mt: 2}}
                            />
                            <TextField
                                fullWidth
                                label="Request"
                                variant="outlined"
                                multiline
                                rows={4}
                                name="request"
                                value={formData.request}
                                onChange={handleInputChange}
                                sx={{mt: 2}}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={sendEmail}
                                sx={{mt: 2}}
                            >
                                Send
                            </Button>
                        </form>
                    </Box>
                </Paper>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3}}>
                    <IconButton
                        component={Link}
                        href="https://www.instagram.com/basil.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        sx={{m: 1}}

                    >
                        <Instagram className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
                    </IconButton>
                    <IconButton
                        component={Link}
                        href="https://www.linkedin.com/in/basil-kanaan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        sx={{m: 1}}
                        className={"sidebar-link"}
                    >
                        <LinkedIn className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
                    </IconButton>
                    <IconButton
                        component={Link}
                        href="https://github.com/basil-kanaan"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        sx={{m: 1}}
                        className={"sidebar-link"}
                    >
                        <GitHub className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
                    </IconButton>
                    <IconButton
                        aria-label="Email"
                        sx={{m: 1}}
                        onClick={sendEmail}
                        className={"sidebar-link"}
                    >
                        <Email className={"sidebar-link"} sx={{color: iconColor, fontSize: iconSize}}/>
                    </IconButton>
                </Box>
            </Container>
        </div>
    );
};

export default ContactSection;
