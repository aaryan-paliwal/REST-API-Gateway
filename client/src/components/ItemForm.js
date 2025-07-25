import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Box, Card, Typography } from "@mui/material";
import API from "../api";

export default function ItemForm({ item, onSuccess, onCancel }) {
  const [name, setName] = useState(item ? item.name : "");
  const [quantity, setQuantity] = useState(item ? item.quantity : 0);
  const [error, setError] = useState("");
  const quantityRef = useRef();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (item) {
        await API.put(`/items/${item._id}`, { name, quantity });
      } else {
        await API.post("/items", { name, quantity });
      }
      onSuccess();
    } catch (err) {
      setError("Failed to save item");
    }
  };

  const handleQuantityFocus = (e) => {
    e.target.select();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={2}>
      <Card elevation={6} sx={{ p: 3, width: 350, borderRadius: 4, background: 'linear-gradient(135deg, #232323 0%, #424242 100%)', color: '#fff' }}>
        <Typography variant="h6" mb={2} fontWeight={600} color="#fff">{item ? "Edit Item" : "Add Item"}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth margin="normal" required InputLabelProps={{ style: { color: '#bdbdbd' } }} InputProps={{ style: { color: '#fff' } }} />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            fullWidth
            margin="normal"
            required
            inputRef={quantityRef}
            onFocus={handleQuantityFocus}
            InputLabelProps={{ style: { color: '#bdbdbd' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2, borderRadius: 2, color: '#fff', background: 'linear-gradient(90deg, #232323 0%, #616161 100%)', '&:hover': { background: 'linear-gradient(90deg, #424242 0%, #757575 100%)' } }}>{item ? "Update" : "Add"}</Button>
          {onCancel && <Button onClick={onCancel} fullWidth sx={{ mt: 1, borderRadius: 2, color: '#fff', background: 'linear-gradient(90deg, #232323 0%, #616161 100%)', '&:hover': { background: 'linear-gradient(90deg, #424242 0%, #757575 100%)' } }}>Cancel</Button>}
        </form>
      </Card>
    </Box>
  );
} 