import React, { useEffect, useState } from "react";
import API from "../api";
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box mt={2}>
      <Typography variant="h6" mb={2} fontWeight={600} color="#fff">Activity Log <HistoryEduIcon sx={{ verticalAlign: 'middle', color: '#bdbdbd' }} /></Typography>
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