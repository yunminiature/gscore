import {createAction} from '@reduxjs/toolkit';
import {ActionTypes, UserType} from './types';

export const addUser = createAction<UserType>(ActionTypes.ADD_USER)