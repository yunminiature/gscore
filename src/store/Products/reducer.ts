import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Product} from './types';
import {addProducts} from "./actions";

const initialState: Product[] = {} as Product[]

const productsReducer = createReducer<Product[]>(initialState, {
  [addProducts.type]: (state, action: PayloadAction<Product[]>) => {
    return action.payload
  }
})

export default productsReducer