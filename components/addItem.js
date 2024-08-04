"use client";

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { TextField, Button, Box } from '@mui/material';

export default function AddItem() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && quantity) {
      await addDoc(collection(db, 'pantryItems'), {
        name,
        quantity: parseInt(quantity),
      });
      setName('');
      setQuantity('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        label="Item name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
      />
      <Button variant="contained" type="submit" fullWidth>Add Item</Button>
    </Box>
  );
}