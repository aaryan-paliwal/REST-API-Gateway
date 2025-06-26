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

export default function ItemList({ onEdit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

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

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight={600} color="#fff">Your Items</Typography>
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
                    <IconButton color="inherit" onClick={() => onEdit(item)} sx={{ color: '#fff', '&:hover': { color: '#bdbdbd' } }}>
                      <EditIcon />
                    </IconButton>
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
              {idx < items.length - 1 && <Divider sx={{ bgcolor: '#333', my: 0 }} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
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