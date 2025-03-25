import React from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearchChange }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        label="Поиск товаров"
        variant="outlined"
        size="small"
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 200 }}
      />
      <IconButton 
        onClick={handleClear} 
        size="small" 
        sx={{ 
          color: 'text.secondary',
          '&:hover': {
            color: 'primary.main'
          }
        }}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;