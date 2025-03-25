import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/products';

// Загрузка продуктов
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const products = await fetchProducts();
    return products;
  }
);

// Добавление продукта
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    const response = await createProduct(productData);
    return response;
  }
);

// Обновление продукта
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, productData }) => {
    const response = await updateProduct(id, productData);
    return response;
  }
);

// Удаление продукта
export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    category: 'Все', // Добавляем состояние для категории
    sortBy: 'default',
    searchQuery: '',
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
        state.sortBy = action.payload;
      },
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка продуктов
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Добавление продукта
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Обновление продукта
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Удаление продукта
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { setCategory, setSortBy, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;