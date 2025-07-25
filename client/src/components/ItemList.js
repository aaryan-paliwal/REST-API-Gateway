import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Divider
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// ItemList component: Displays a list of items with edit and delete options
export default function ItemList({ onEdit }) {
  const [items, setItems] = useState([]); // List of items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Delete confirmation dialog state
  const [itemToDelete, setItemToDelete] = useState(null); // Item selected for deletion

  // Fetch items from the API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      setError("Failed to fetch items");
    }
    setLoading(false);
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle delete button click: open confirmation dialog
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion: call API and refresh list
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await API.delete(`/items/${itemToDelete._id}`);
      fetchItems();
    } catch (err) {
      alert("Delete failed");
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Cancel deletion: close dialog
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Show loading or error states
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {/* Title */}
      <Typography variant="h6" mb={2} fontWeight={600} color="#fff">Your Items</Typography>
      {/* List of items */}
      <Paper elevation={0} sx={{ background: 'transparent' }}>
        <List sx={{ width: '100%', bgcolor: 'transparent' }}>
          {items.map((item, idx) => (
            <React.Fragment key={item._id}>
              <ListItem
                sx={{
                  bgcolor: '#232323',
                  borderRadius: 2,
                  mb: 2,
                  boxShadow: '0 2px 8px 0 #000a',
                  color: '#fff',
                  px: 2,
                }}
                secondaryAction={
                  <Box>
                    {/* Edit button */}
                    <IconButton color="inherit" onClick={() => onEdit(item)} sx={{ color: '#fff', '&:hover': { color: '#bdbdbd' } }}>
                      <EditIcon />
                    </IconButton>
                    {/* Delete button */}
                    <IconButton color="inherit" onClick={() => handleDeleteClick(item)} sx={{ color: '#fff', '&:hover': { color: '#bdbdbd' } }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={<Typography variant="subtitle1" fontWeight={600} color="#fff">{item.name}</Typography>}
                  secondary={<Typography color="#bdbdbd">Quantity: {item.quantity}</Typography>}
                />
              </ListItem>
              {/* Divider between items */}
              {idx < items.length - 1 && <Divider sx={{ bgcolor: '#333', my: 0 }} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      {/* Delete confirmation dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteCancel} 
        PaperProps={{ 
          sx: { 
            background: '#232323', 
            color: '#fff', 
            borderRadius: 2, 
            width: 340, 
            maxWidth: '90vw', 
            p: 0, 
          } 
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 20, pb: 0 }}>Confirm Deletion</DialogTitle>
        <DialogContent sx={{ p: 2, pt: 1 }}>
          <DialogContentText sx={{ color: '#bdbdbd', fontSize: 16, wordBreak: 'break-word', whiteSpace: 'pre-line', m: 0 }}>
            Are you sure you want to delete the item "{itemToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button onClick={handleDeleteCancel} color="secondary" variant="outlined">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 