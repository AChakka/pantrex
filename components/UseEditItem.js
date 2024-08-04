import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function UseEditItem({ item, onClose, onSave }) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSave = () => {
    onSave({ ...item, name, quantity: parseInt(quantity) });
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Item Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}