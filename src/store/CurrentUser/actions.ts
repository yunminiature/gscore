import {createAction} from '@reduxjs/toolkit';
import {ActionTypes} from './types';

export const addCurrentUser = createAction<number>(ActionTypes.ADD_CURRENT_USER)
export const addPackage = createAction<number>(ActionTypes.ADD_PACKAGE)