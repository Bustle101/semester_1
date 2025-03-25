import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, setCategory, setSortBy, setSearchQuery } from '../features/productsSlice';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import SortPanel from './SortPanel';
import SearchBar from './SearchBar';
import AddProduct from './AddProduct';
import { Box, Container } from '@mui/material';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, category, sortBy, searchQuery } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts = category === 'Все'
    ? items
    : items.filter((product) => 
        product.categories?.includes(category) || product.category?.includes(category)
      );

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return 0;
  });

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading products.</div>;

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1800px' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        py: 3 
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mb: 2
        }}>
          <AddProduct />
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          mb: 2
        }}>
          <FilterPanel onFilterChange={(category) => dispatch(setCategory(category))} />
          <SortPanel onSortChange={(sortBy) => dispatch(setSortBy(sortBy))} />
          <SearchBar onSearchChange={(query) => dispatch(setSearchQuery(query))} />
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          justifyContent: 'center',
          width: '100%'
        }}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductList;