import React from 'react';
import { Box, Container, Paper, Stack, TextField, Typography, Button } from '@mui/material';

export default function ContactSection() {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: { xs: '100vh', md: '90vh' },
                background: 'radial-gradient(1200px 600px at 10% -10%, #0f244a 0%, rgba(5,8,19,1) 40%), #050813',
                // center the whole column inside this section
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    // center heading + card + socials as a column
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 3, md: 4 },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: { xs: '2.25rem', md: '3.25rem' },
                        fontWeight: 800,
                    }}
                >
                    Contact
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 3,
                        maxWidth: 720,
                        width: '100%',
                        mx: 'auto',
                        backdropFilter: 'blur(8px)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.05))',
                        border: '1px solid rgba(255,255,255,.12)',
                    }}
                >
                    <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                        Email me
                    </Typography>

                    <Stack spacing={2.5}>
                        <TextField
                            label="Name"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ sx: { color: 'rgba(255,255,255,.85)' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,.04)',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,.18)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,.28)' },
                                    '&.Mui-focused fieldset': { borderColor: 'rgba(88,175,255,.9)' },
                                },
                            }}
                        />
                        <TextField
                            type="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ sx: { color: 'rgba(255,255,255,.85)' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,.04)',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,.18)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,.28)' },
                                    '&.Mui-focused fieldset': { borderColor: 'rgba(88,175,255,.9)' },
                                },
                            }}
                        />
                        <TextField
                            label="Request"
                            fullWidth
                            multiline
                            minRows={4}
                            variant="outlined"
                            InputLabelProps={{ sx: { color: 'rgba(255,255,255,.85)' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,.04)',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,.18)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,.28)' },
                                    '&.Mui-focused fieldset': { borderColor: 'rgba(88,175,255,.9)' },
                                },
                            }}
                        />

                        <Box sx={{ textAlign: 'center', pt: 1 }}>
                            <Button
                                size="large"
                                variant="contained"
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                                    boxShadow: '0 10px 24px rgba(0, 162, 255, .25)',
                                    '&:hover': { boxShadow: '0 14px 30px rgba(0, 162, 255, .35)' },
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Stack>
                </Paper>

                {/* Socials row */}
                <Stack direction="row" spacing={3} justifyContent="center">
                    {/* put your social icon buttons here */}
                </Stack>
            </Container>
        </Box>
    );
}
