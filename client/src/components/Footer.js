import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";

// Footer component: Displays app info, navigation links, and credits
export default function Footer() {
  return (
    <Box component="footer" sx={{
      width: '100%',
      py: 4,
      background: 'linear-gradient(90deg, #181818 0%, #232323 100%)',
      borderTop: '1px solid #232323',
      color: '#bdbdbd',
      textAlign: 'center',
      mt: 10,
    }}>
      {/* App name and copyright */}
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700} color="#fff" display="inline">
          FlowOps
        </Typography>
        <Typography variant="body2" display="inline" sx={{ ml: 1 }}>
          &copy; {new Date().getFullYear()} FlowOps. All rights reserved.
        </Typography>
      </Box>
      {/* Navigation links */}
      <Box mb={1}>
        <MuiLink href="#" underline="hover" color="#bdbdbd" sx={{ mx: 1 }}>About</MuiLink>
        <MuiLink href="#" underline="hover" color="#bdbdbd" sx={{ mx: 1 }}>Features</MuiLink>
        <MuiLink href="#" underline="hover" color="#bdbdbd" sx={{ mx: 1 }}>Contact</MuiLink>
        <MuiLink href="#" underline="hover" color="#bdbdbd" sx={{ mx: 1 }}>Privacy Policy</MuiLink>
      </Box>
      {/* Credits */}
      <Typography variant="caption" color="#757575">
        Designed & Developed by Aaryan Paliwal
      </Typography>
    </Box>
  );
} 