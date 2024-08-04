"use client";

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { List, ListItem, ListItemText, Typography, Box, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditItemModal from './UseEditItem';

export default function PantryList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'pantryItems'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'pantryItems', id));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleCloseModal = () => {
    setEditItem(null);
  };

  const handleSaveEdit = async (updatedItem) => {
    await updateDoc(doc(db, 'pantryItems', updatedItem.id), {
      name: updatedItem.name,
      quantity: updatedItem.quantity
    });
    setEditItem(null);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Pantry Items</Typography>
      <TextField
        label="Search items"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={`${item.name} - Quantity: ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
    </Box>
  );
}