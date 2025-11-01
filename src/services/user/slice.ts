import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, registerUser, updateUser } from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean; //признак заввершения проверки авторизации
  error: string | null;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //serUser это action creator, (state, action) => {} это reducer
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user; // action.payload.user - только пользователь из ответа
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? 'Ошибка авторизации';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? 'Ошибка регистрации';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions; // генераторы экшенов
export const { getUser, getIsAuthChecked } = userSlice.selectors; // извлекаем селекторы
