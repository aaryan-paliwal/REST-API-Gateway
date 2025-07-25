import React, { useEffect, useState } from "react";
import API from "../api";
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

// ActivityLog component: Displays a list of recent user activities
export default function ActivityLog() {
  const [logs, setLogs] = useState([]); // List of activity logs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch activity logs from the API on mount
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await API.get("/activity");
        setLogs(res.data);
      } catch (err) {
        setError("Failed to fetch activity logs");
      }
      setLoading(false);
    };
    fetchLogs();
  }, []);

  // Show loading or error states
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box mt={2}>
      {/* Title */}
      <Typography variant="h6" mb={2} fontWeight={600} color="#fff">Activity Log <HistoryEduIcon sx={{ verticalAlign: 'middle', color: '#bdbdbd' }} /></Typography>
      {/* List of activity logs */}
      <Grid container spacing={2}>
        {logs.map(log => (
          <Grid item xs={12} sm={6} md={4} key={log._id}>
            <Card elevation={4} sx={{
              background: 'linear-gradient(135deg, #232323 0%, #424242 100%)',
              borderRadius: 3,
              color: '#fff',
            }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} color="#fff">{log.action}</Typography>
                <Typography color="text.secondary" fontSize={13} sx={{ color: '#bdbdbd' }}>{new Date(log.timestamp).toLocaleString()}</Typography>
                <Typography color="text.secondary" fontSize={13} sx={{ color: '#bdbdbd' }}>Meta: {JSON.stringify(log.metadata)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 