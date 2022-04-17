import {createAction} from '@reduxjs/toolkit';
import {
  ActionTypes,
  User
} from './types';

export const addPackage = createAction<number>(ActionTypes.ADD_PACKAGE)

export const signInAction = createAction<Omit<User, "package">>(ActionTypes.SIGN_IN)