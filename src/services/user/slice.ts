import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, registerUser, updateUser } from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean; //признак заввершения проверки авторизации
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      //serUser это action creator, а (state, action) => {} это reducer
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
        //fulfield - успешное выполнение промиса
        state.user = action.payload.user; // action.payload.user - только пользователь из ответа
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.user = null;
      });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions; // генераторы экшенов
export const { getUser, getIsAuthChecked } = userSlice.selectors; // извлекаем селекторы
