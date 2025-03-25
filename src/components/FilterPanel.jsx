import React from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';

const FilterPanel = ({ onFilterChange }) => {
  const allCategory = ['Все'];
  const mainCategories = ['ordinary', 'epic', 'legendary'];
  const rankCategories = ['1 rank', '2 rank', '3 rank'];

  const getButtonColor = (category) => {
    switch(category) {
      case 'Все': return '#19191a';  
      case 'ordinary': return '#4CAF50';  
      case 'epic': return '#2196F3';     
      case 'legendary': return '#9C27B0';  
      case '1 rank': return '#a1a1a1';  
      case '2 rank': return '#8f8f8d'; 
      case '3 rank': return '#7d7d7a'; 
      default: return undefined;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <ButtonGroup 
        variant="contained"
        sx={{ width: 'fit-content' }}
      >
        {allCategory.map((category) => (
          <Button 
            key={category} 
            onClick={() => onFilterChange(category)}
            sx={{ 
              bgcolor: getButtonColor(category),
              '&:hover': {
                bgcolor: getButtonColor(category),
                opacity: 0.9
              }
            }}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup variant="contained">
        {mainCategories.map((category) => (
          <Button 
            key={category} 
            onClick={() => onFilterChange(category)}
            sx={{ 
              bgcolor: getButtonColor(category),
              '&:hover': {
                bgcolor: getButtonColor(category),
                opacity: 0.9
              }
            }}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup 
        variant="contained" 
        sx={{ 
          width: 'fit-content',
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: 'rgba(255, 255, 255, 0.3)'
          }
        }}
      >
        {rankCategories.map((category) => (
          <Button 
            key={category} 
            onClick={() => onFilterChange(category)}
            sx={{ 
              bgcolor: getButtonColor(category),
              '&:hover': {
                bgcolor: getButtonColor(category),
                opacity: 0.9
              }
            }}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default FilterPanel;