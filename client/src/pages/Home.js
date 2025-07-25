import React from "react";
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useNavigate } from "react-router-dom";

// List of features to display on the home page
const features = [
  {
    title: "User Registration",
    description: "Sign up for a secure account with FlowOps.",
    icon: <LockOpenIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "User Login",
    description: "Authenticate and access your dashboard with JWT.",
    icon: <RocketLaunchIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "Create Item",
    description: "Add new items to your collection.",
    icon: <AddBoxIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "View Items",
    description: "Browse all your items with pagination support.",
    icon: <ListAltIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "View Single Item",
    description: "Access details of a specific item (with access control).",
    icon: <ListAltIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "Update Item",
    description: "Edit your items (only owner or admin).",
    icon: <EditIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "Delete Item",
    description: "Remove items you own or as an admin.",
    icon: <DeleteIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "Activity Logging",
    description: "Track user actions like registration, login, and item changes.",
    icon: <HistoryEduIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "View Activity Logs",
    description: "See the latest 50 activity logs (per user or admin).",
    icon: <HistoryEduIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
  {
    title: "Generic Data Management",
    description: "Add, view, update, and delete generic data entries.",
    icon: <DataObjectIcon sx={{ fontSize: 40, color: '#fff' }} />,
  },
];

// Home page component: Shows hero section and feature overview
export default function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181818 0%, #232323 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      py: 8,
    }}>
      {/* Hero Section: App name, tagline, and Get Started button */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h1" color="#fff" fontWeight={800} gutterBottom sx={{ letterSpacing: '-2px', textShadow: '0 4px 32px #000a' }}>
          FlowOps
        </Typography>
        <Typography variant="h4" color="#fff" fontWeight={600} mb={3} sx={{ maxWidth: 600, textAlign: 'center', textShadow: '0 2px 8px #0006' }}>
          The command center for your digital operations.<br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{ display: 'inline-block' }}
          >
            Streamline, automate, and scale your business with FlowOps.
          </motion.span>
        </Typography>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {/* Get Started button navigates to registration */}
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.25rem',
              borderRadius: 999,
              boxShadow: '0 8px 32px 0 #0008',
              fontWeight: 700,
              mt: 2,
              color: '#fff',
              background: 'linear-gradient(90deg, #232323 0%, #424242 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #424242 0%, #616161 100%)',
              },
            }}
            endIcon={<RocketLaunchIcon />}
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>

      {/* Features Section: List of app features */}
      <Box sx={{ mt: 10, width: '100%', maxWidth: 1200 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 #000a" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card elevation={8} sx={{ borderRadius: 4, background: 'linear-gradient(135deg, #232323 0%, #424242 100%)', color: '#fff', minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 220 }}>
                  <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                    {feature.icon}
                    <Typography variant="h6" fontWeight={700} mb={1} color="inherit" mt={2}>{feature.title}</Typography>
                    <Typography color="text.secondary" mb={2} sx={{ color: '#bdbdbd', fontSize: 15 }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
} 