import {createAction} from '@reduxjs/toolkit';
import {
  ActionTypes
} from './types';

export const addPackage = createAction<number>(ActionTypes.ADD_PACKAGE)

export const addCurrentSubscribe = createAction<number>(ActionTypes.ADD_SUBSCRIBE)

export const signOutAction = createAction(ActionTypes.SIGN_OUT)