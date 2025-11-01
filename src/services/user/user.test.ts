import { TUser } from '@utils-types';
import { userSlice, initialState } from './slice';
import { login, logout, registerUser, updateUser } from './actions';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Tester'
};

describe('user', () => {
  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('login user', () => {
    it('should log in user successfully', () => {
      const nextState = userSlice.reducer(undefined, {
        type: login.fulfilled.type,
        payload: { user: mockUser }
      });

      expect(nextState).toEqual({
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      });
    });

    it('should handle login.rejected', () => {
      const nextState = userSlice.reducer(undefined, {
        type: login.rejected.type,
        error: { message: 'Ошибка авторизации' }
      });

      expect(nextState).toEqual({
        ...initialState,
        user: null,
        error: 'Ошибка авторизации'
      });
    });
  });

  it('logout user', () => {
    const prevState = {
      ...initialState,
      user: mockUser
    };

    const nextState = userSlice.reducer(prevState, {
      type: logout.fulfilled.type
    });

    expect(nextState).toEqual({
      ...initialState,
      user: null
    });
  });

  describe('register User', () => {
    it('should register user successfully', () => {
      const nextState = userSlice.reducer(undefined, {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      });

      expect(nextState).toEqual({
        ...initialState,
        user: mockUser
      });
    });

    it('should handle register.rejected', () => {
      const nextState = userSlice.reducer(undefined, {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' }
      });

      expect(nextState).toEqual({
        ...initialState,
        user: null,
        error: 'Ошибка регистрации'
      });
    });
  });

  it('update user', () => {
    const prevState = {
      ...initialState,
      user: mockUser
    };

    const nextState = userSlice.reducer(prevState, {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    });
  });
});
