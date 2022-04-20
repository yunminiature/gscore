import {createAction} from '@reduxjs/toolkit';
import {
  ActionTypes,
  User,
  UserDto
} from './types';

export const addPackage = createAction<number>(ActionTypes.ADD_PACKAGE)

export const signInAction = createAction<Omit<User, "package">>(ActionTypes.SIGN_IN)
export const signOutAction = createAction(ActionTypes.SIGN_OUT)

export const updateDataAction = createAction<UserDto>(ActionTypes.UPDATE_DATA)