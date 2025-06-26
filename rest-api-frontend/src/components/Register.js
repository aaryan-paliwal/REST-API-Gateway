import React, { useState } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await API.post("/auth/register", { username, password });
      setSuccess("Registration successful! Please login.");
      toast.success("Registration successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Registration failed! Username may already exist.");
      toast.error("Registration failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card elevation={6} sx={{ p: 4, width: 350, borderRadius: 4, background: 'linear-gradient(135deg, #232323 0%, #424242 100%)', color: '#fff' }}>
        <Typography variant="h5" mb={2} fontWeight={600} color="#fff">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth margin="normal" required InputLabelProps={{ style: { color: '#bdbdbd' } }} InputProps={{ style: { color: '#fff' } }} />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" required InputLabelProps={{ style: { color: '#bdbdbd' } }} InputProps={{ style: { color: '#fff' } }} />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2, borderRadius: 2, color: '#fff', background: 'linear-gradient(90deg, #232323 0%, #616161 100%)', '&:hover': { background: 'linear-gradient(90deg, #424242 0%, #757575 100%)' } }}>Register</Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="#bdbdbd">
            Already a user?{' '}
            <Button component={Link} to="/login" color="secondary" sx={{ textTransform: 'none', p: 0, minWidth: 0, color: '#fff', fontWeight: 600 }}>
              Login
            </Button>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
} 