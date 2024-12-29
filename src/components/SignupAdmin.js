import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const AdminRegister = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://my-elegant-backend-api.onrender.com/admin/register', formData);
            alert('Admin registered successfully!');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert('Error registering admin');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default AdminRegister;
