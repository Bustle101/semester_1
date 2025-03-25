import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../features/productsSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProduct from './EditProduct';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      dispatch(removeProduct(product.id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ 
        width: 300,
        height: 'auto',
        margin: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <CardMedia
          component="img"
          sx={{ 
            height: 300,
            objectFit: 'contain',
            padding: 2,
            backgroundColor: 'background.paper'
          }}
          image={product.image}
          alt={product.title}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{product.title}</Typography>
            <Box>
              <EditProduct product={product} />
              <IconButton 
                onClick={handleDelete} 
                size="small" 
                color="error"
                sx={{ 
                  '&:hover': {
                    backgroundColor: 'error.light',
                    color: 'white'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ flexGrow: 1, mb: 1 }}>{product.description}</Typography>
          <Typography variant="h5">{product.price} rp</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;