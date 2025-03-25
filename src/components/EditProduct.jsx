import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProduct } from '../features/productsSlice';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct({
      id: product.id,
      productData: {
        ...editedProduct,
        price: Number(editedProduct.price)
      }
    }));
    handleClose();
  };

  return (
    <>
      <IconButton 
        onClick={handleOpen} 
        size="small"
        sx={{ 
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'white'
          }
        }}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать товар</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="title"
                label="Название"
                value={editedProduct.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="price"
                label="Цена"
                type="number"
                value={editedProduct.price}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="description"
                label="Описание"
                multiline
                rows={4}
                value={editedProduct.description}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="image"
                label="URL изображения"
                value={editedProduct.image}
                onChange={handleChange}
                required
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type="submit" variant="contained">Сохранить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditProduct; 