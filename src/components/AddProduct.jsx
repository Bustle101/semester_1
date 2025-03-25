import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/productsSlice';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box
} from '@mui/material';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({
      ...product,
      price: Number(product.price)
    }));
    handleClose();
    setProduct({
      title: '',
      price: '',
      description: '',
      image: '',
      category: ''
    });
  };

  return (
    <>
      <Button 
        variant="contained" 
        sx={{ 
          bgcolor: '#000000',
          '&:hover': {
            bgcolor: '#333333'
          }
        }} 
        onClick={handleOpen}
      >
        Добавить продукт
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить новый продукт</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField name="title" label="Название" value={product.title} onChange={handleChange} required fullWidth />
              <TextField name="price" label="Цена" type="number" value={product.price} onChange={handleChange} required fullWidth />
              <TextField name="description" label="Описание" multiline rows={4} value={product.description} onChange={handleChange} required fullWidth />
              <TextField name="image" label="URL изображения" value={product.image} onChange={handleChange} required fullWidth />
              <TextField name="category" label="Категория" value={product.category} onChange={handleChange} required fullWidth />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type="submit" variant="contained">Добавить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddProduct;