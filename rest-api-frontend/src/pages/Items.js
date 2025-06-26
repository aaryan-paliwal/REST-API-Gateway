import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Modal } from "@mui/material";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function Items() {
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('add') === '1') {
      setEditingItem(null);
      setShowForm(true);
      params.delete('add');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    setRefresh((r) => !r);
  };

  return (
    <Box sx={{
      minHeight: '80vh',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      py: 6,
    }}>
      <Typography variant="h4" color="#fff" fontWeight={700} mb={4}>
        Manage Items
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleAdd} sx={{ mb: 3, borderRadius: 2, fontWeight: 600 }}>
        Add Item
      </Button>
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        aria-labelledby="add-item-modal"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1300 }}
      >
        <Box sx={{
          outline: 'none',
          bgcolor: '#232323',
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
          minWidth: 340,
          maxWidth: '90vw',
        }}>
          <ItemForm item={editingItem} onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
        </Box>
      </Modal>
      <Paper elevation={4} sx={{ width: '100%', maxWidth: 900, background: '#232323', mt: 3, p: 3, borderRadius: 3 }}>
        <ItemList key={refresh} onEdit={handleEdit} />
      </Paper>
    </Box>
  );
} 