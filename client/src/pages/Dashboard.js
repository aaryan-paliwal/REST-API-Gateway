import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Avatar, CircularProgress, Divider, Stack, Button } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import API from "../api";

// List of dashboard features to display as cards
const dashboardFeatures = [
  {
    label: "Items",
    title: "View My Items",
    description: "Browse and manage all items you own or have access to.",
    icon: <ListAltIcon sx={{ fontSize: 40, color: '#fff', mb: 1 }} />,
    link: "/items"
  },
  {
    label: "Items",
    title: "Add New Item",
    description: "Create a new item and add it to your collection.",
    icon: <AddBoxIcon sx={{ fontSize: 40, color: '#fff', mb: 1 }} />,
    link: "/items?add=1"
  },
  {
    label: "Activity",
    title: "Recent Activity",
    description: "See your latest actions and changes in the system.",
    icon: <HistoryEduIcon sx={{ fontSize: 40, color: '#fff', mb: 1 }} />,
    link: "/activity"
  },
  {
    label: "Account",
    title: "Profile Info",
    description: "View your account details and settings.",
    icon: <AccountCircleIcon sx={{ fontSize: 40, color: '#fff', mb: 1 }} />,
    link: "#"
  },
];

// Dashboard component: Shows user stats, feature cards, and recent activity
export default function Dashboard() {
  const [user, setUser] = useState(null); // User info
  const [itemCount, setItemCount] = useState(null); // Number of items
  const [activity, setActivity] = useState([]); // Recent activity logs
  const [loading, setLoading] = useState(true); // Loading state for main content
  const [statsLoading, setStatsLoading] = useState(true); // Loading state for stats

  // Fetch user info, item count, and recent activity on mount
  useEffect(() => {
    const fetchData = async () => {
      setStatsLoading(true);
      try {
        // Fetch user info
        let userRes;
        try {
          userRes = await API.get("/auth/me");
        } catch {
          userRes = { data: { username: "User" } };
        }
        setUser(userRes.data);
        // Fetch items
        const itemsRes = await API.get("/items");
        setItemCount(itemsRes.data.length);
        // Fetch recent activity
        const activityRes = await API.get("/activity");
        setActivity(activityRes.data.slice(0, 3));
      } catch (err) {
        // fallback
      }
      setStatsLoading(false);
    };
    fetchData();
    setLoading(false);
  }, []);

  return (
    <Box sx={{
      minHeight: '80vh',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      py: 6,
      px: 2,
    }}>
      {/* Greeting and Stats */}
      <Box sx={{ width: '100%', maxWidth: 1200, mb: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={2}>
          <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
            <Avatar sx={{ bgcolor: '#232323', color: '#fff', width: 56, height: 56, mr: 2 }}>
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#fff">
                {user ? `Welcome, ${user.name || user.username || 'User'}!` : 'Welcome!'}
              </Typography>
              <Typography color="#bdbdbd" fontSize={16}>
                Here's a quick overview of your activity.
              </Typography>
            </Box>
          </Box>
          {/* Stat cards for items and recent activities */}
          <Stack direction="row" spacing={2}>
            <Card elevation={0} sx={{ bgcolor: '#232323', color: '#fff', px: 4, py: 2, borderRadius: 3, minWidth: 120, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700}>{statsLoading ? <CircularProgress size={20} /> : itemCount ?? '-'}</Typography>
              <Typography color="#bdbdbd" fontSize={14}>Items</Typography>
            </Card>
            <Card elevation={0} sx={{ bgcolor: '#232323', color: '#fff', px: 4, py: 2, borderRadius: 3, minWidth: 120, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700}>{statsLoading ? <CircularProgress size={20} /> : activity.length}</Typography>
              <Typography color="#bdbdbd" fontSize={14}>Recent Activities</Typography>
            </Card>
          </Stack>
        </Stack>
      </Box>
      {/* Feature Cards */}
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 1200, mb: 4 }}>
        {dashboardFeatures.map((feature, idx) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card
              component={Link}
              to={feature.link}
              sx={{
                background: '#232323',
                color: '#fff',
                borderRadius: 3,
                boxShadow: '0 2px 12px 0 #000a',
                minHeight: 260,
                height: 260,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 0,
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.03)',
                  boxShadow: '0 8px 32px 0 #000a',
                  background: '#282828',
                  textDecoration: 'none',
                },
              }}
            >
              <CardContent sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 180,
                minHeight: 180,
                p: 3,
              }}>
                <Typography variant="caption" color="#bdbdbd" mb={1} display="block">
                  {feature.label}
                </Typography>
                {feature.icon}
                <Typography variant="h6" fontWeight={600} mb={1} color="#fff">
                  {feature.title}
                </Typography>
                <Typography color="#bdbdbd" fontSize={15}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Recent Activity Preview */}
      <Box sx={{ width: '100%', maxWidth: 1200, mt: 2 }}>
        <Typography variant="h6" fontWeight={700} color="#fff" mb={2}>
          Recent Activity
        </Typography>
        <Divider sx={{ bgcolor: '#333', mb: 2 }} />
        {statsLoading ? (
          <CircularProgress />
        ) : activity.length === 0 ? (
          <Typography color="#bdbdbd">No recent activity found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {activity.map((log) => (
              <Grid item xs={12} sm={6} md={4} key={log._id}>
                <Card elevation={4} sx={{
                  background: 'linear-gradient(135deg, #232323 0%, #424242 100%)',
                  borderRadius: 3,
                  color: '#fff',
                  minHeight: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} color="#fff">{log.action}</Typography>
                    <Typography color="#bdbdbd" fontSize={13}>{new Date(log.timestamp).toLocaleString()}</Typography>
                    <Typography color="#bdbdbd" fontSize={13} sx={{ wordBreak: 'break-word' }}>Meta: {JSON.stringify(log.metadata)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
} 