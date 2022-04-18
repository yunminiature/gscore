import {createAction} from '@reduxjs/toolkit';
import {
  ActionTypes,
  Product
} from './types';

export const addProducts = createAction<Product[]>(ActionTypes.ADD_PRODUCT)