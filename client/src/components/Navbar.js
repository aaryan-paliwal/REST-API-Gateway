import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Link as MuiLink, Stack, IconButton } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Navbar component: Displays the top navigation bar with links and social icons
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token"); // Check if user is logged in

  // Handle user logout: remove token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{
      top: 0,
      zIndex: 1200,
      background: "linear-gradient(90deg, #181818 0%, #232323 100%)",
      boxShadow: "0 4px 20px 0 #000a",
      px: 2
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
        {/* Left: Logo + Name as clickable link */}
        <Box display="flex" alignItems="center" component={Link} to="/" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
          <Avatar sx={{ bgcolor: "#232323", color: "#fff", mr: 1, width: 40, height: 40 }}>
            <BusinessCenterIcon sx={{ color: '#bdbdbd', fontSize: 28 }} />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: '#fff', fontSize: 24 }}>
            FlowOps
          </Typography>
        </Box>

        {/* Center: Navigation Links (show different links based on login state) */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Home link (always visible) */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ color: location.pathname === '/' ? '#F472B6' : '#fff', fontWeight: 600, fontSize: 16, '&:hover': { color: '#F472B6' } }}
          >
            Home
          </Button>
          {/* Show dashboard and activity links only if logged in */}
          {token && (
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{ color: location.pathname === '/dashboard' ? '#F472B6' : '#fff', fontWeight: 600, fontSize: 16, '&:hover': { color: '#F472B6' } }}
            >
              Dashboard
            </Button>
          )}
          {token && (
            <Button
              color="inherit"
              component={Link}
              to="/activity"
              sx={{ color: location.pathname === '/activity' ? '#F472B6' : '#fff', fontWeight: 600, fontSize: 16, '&:hover': { color: '#F472B6' } }}
            >
              Activity Log
            </Button>
          )}
          {/* Show login/register if not logged in */}
          {!token && (
            <Button color="inherit" component={Link} to="/login" sx={{ color: location.pathname === '/login' ? '#F472B6' : '#fff', fontWeight: 600, fontSize: 16, '&:hover': { color: '#F472B6' } }}>Login</Button>
          )}
          {!token && (
            <Button color="inherit" component={Link} to="/register" sx={{ color: location.pathname === '/register' ? '#F472B6' : '#fff', fontWeight: 600, fontSize: 16, '&:hover': { color: '#F472B6' } }}>Register</Button>
          )}
          {/* Show logout if logged in */}
          {token && (
            <Button color="inherit" onClick={handleLogout} sx={{ color: '#fff', fontWeight: 600, fontSize: 16, '&:hover': { color: '#F472B6' } }}>Logout</Button>
          )}
        </Stack>

        {/* Right: Social Links (GitHub, LinkedIn) */}
        <Box display="flex" alignItems="center">
          <IconButton
            component={MuiLink}
            href="https://github.com/aaryan-paliwal"
            target="_blank"
            rel="noopener"
            sx={{ color: '#fff', mx: 0.5, '&:hover': { color: '#F472B6' } }}
            aria-label="GitHub"
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          <IconButton
            component={MuiLink}
            href="https://www.linkedin.com/in/aaryan-paliwal/"
            target="_blank"
            rel="noopener"
            sx={{ color: '#fff', mx: 0.5, '&:hover': { color: '#F472B6' } }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 