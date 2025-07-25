import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Modal } from "@mui/material";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";
import { useLocation, useNavigate } from "react-router-dom";

// Items page: Allows users to view, add, and edit items
export default function Items() {
  const [editingItem, setEditingItem] = useState(null); // Item being edited (null for add)
  const [showForm, setShowForm] = useState(false); // Show/hide the item form modal
  const [refresh, setRefresh] = useState(false); // Used to trigger refresh of the item list
  const location = useLocation();
  const navigate = useNavigate();

  // If URL has ?add=1, open the add item modal and clean up the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('add') === '1') {
      setEditingItem(null);
      setShowForm(true);
      params.delete('add');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  // Open the form to edit an item
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // Open the form to add a new item
  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  // After successful add/edit, close modal and refresh list
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
      {/* Page title */}
      <Typography variant="h4" color="#fff" fontWeight={700} mb={4}>
        Manage Items
      </Typography>
      {/* Add Item button */}
      <Button variant="contained" color="secondary" onClick={handleAdd} sx={{ mb: 3, borderRadius: 2, fontWeight: 600 }}>
        Add Item
      </Button>
      {/* Modal for add/edit item form */}
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
      {/* Item list (refreshes on add/edit/delete) */}
      <Paper elevation={4} sx={{ width: '100%', maxWidth: 900, background: '#232323', mt: 3, p: 3, borderRadius: 3 }}>
        <ItemList key={refresh} onEdit={handleEdit} />
      </Paper>
    </Box>
  );
} 