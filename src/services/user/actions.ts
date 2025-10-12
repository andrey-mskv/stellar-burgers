import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './slice';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '@api';
import { getCookie } from '../../utils/cookie';

// Авторизация пользователя
export const login = createAsyncThunk(
  'user/login', //префикс для action, первое это имя слайса, второе - название действия
  async (data: TLoginData) => loginUserApi(data)
);

// Выход из системы
export const logout = createAsyncThunk('user/logout', async () => logoutApi());

// Обновление данных пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { name?: string; email?: string; password?: string }) =>
    updateUserApi(data)
);

// Регистрация пользователя
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: { name: string; email: string; password: string }) =>
    registerUserApi(data)
);

// Восстановление пароля
export const restorePassword = createAsyncThunk(
  'user/restorePassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

// Проверка наличия токена в куках
export function isTokenExists() {
  return !!getCookie('accessToken');
}

// Проверка авторизации пользователя
export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
