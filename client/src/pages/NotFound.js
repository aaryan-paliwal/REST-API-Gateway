import React from "react";
import { Box, Typography } from "@mui/material";

// NotFound page: Displays a 404 error for unknown routes
export default function NotFound() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Typography variant="h3" color="error">404 - Page Not Found</Typography>
    </Box>
  );
} 