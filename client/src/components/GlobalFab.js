import React from "react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from "react-router-dom";

export default function GlobalFab() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFabClick = () => {
    navigate('/items?add=1');
  };

  if (location.pathname === '/login' || location.pathname === '/register') return null;

  return (
    <Fab
      color="secondary"
      aria-label="add"
      onClick={handleFabClick}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1201,
        boxShadow: '0 4px 24px 0 #000a',
      }}
    >
      <AddIcon />
    </Fab>
  );
} 