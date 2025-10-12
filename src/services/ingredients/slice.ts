import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './thunks';
import { TIngredient } from '../../utils/types';

type IngredientsState = {
  item: TIngredient | null;
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  item: null,
  items: [],
  loading: true,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.items,

    getBunPrice: (state) => {
      state.item ? state.item.price : 0;
    },

    ingredientsLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить ингредиенты';
      });
  }
});

export const { getIngredients, ingredientsLoading, getError } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
