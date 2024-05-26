import React, { useState } from "react";
import axios from "axios";
import { TextField, Typography, Box, Link, Snackbar } from "@mui/material";

function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        setLoading(true);

        // Check if any field is empty
        if (!username || !email || !password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        // Check if email is empty or invalid
        if (!email) {
            setError("Email cannot be empty");
            setLoading(false);
            return;
        } else if (!validateEmail(email)) {
            setError("Invalid email format");
            setLoading(false);
            return;
        }

        try {
            const postData = {
                username: username,
                email: email,
                password: password
            };
            console.log('Sending data:', postData); // Log the data being sent

            const response = await axios.post('http://localhost/register.php', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response.data); // Log the response from the server

            if (response.data.message === 'User registered successfully') {
                setOpenSnackbar(true); // Open the Snackbar
                setError(''); // Clear any previous error
            } else {
                setError(response.data.message || 'Unknown error occurred'); // Set the error message or a default message
            }
        } catch (error) {
            console.error("Error during registration:", error);
            console.log("Error response:", error.response); // Log the error response
            setError('Error during registration');
        } finally {
            setLoading(false);
        }
    }

    const validateEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8,
            }}
        >
            <Typography component="h1" variant="h5">
                Inscription
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nom"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {error && <Typography variant="body2" color="error">{error}</Typography>}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <a
                        href="#"
                        onClick={handleSubmit}
                        style={{
                            display: 'block',
                            width: '100%',
                            backgroundColor: '#1976D2',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            marginTop: '20px',
                        }}
                    >
                        {loading ? 'Chargement...' : 'Confirmer'}
                    </a>
                </Link>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message="Inscription réussie !"
            />
        </Box>
    );
}

export default Inscription;
