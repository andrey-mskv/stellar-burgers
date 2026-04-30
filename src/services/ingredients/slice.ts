import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './thunks';
import { TIngredient } from '../../utils/types';

type IngredientsState = {
  item: TIngredient | null;
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: IngredientsState = {
  item: null,
  items: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.items,

    getBunPrice: (state) => state.item ? state.item.price : 0,

    ingredientsLoading: (state) => state.isLoading,
    
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить ингредиенты';
      });
  }
});

export const { getIngredients, ingredientsLoading, getError } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
