import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Products} from './types';
import {addProducts} from "./actions";

const initialState: Products = {} as Products

const productsReducer = createReducer<Products>(initialState, {
  [addProducts.type]: (state, action: PayloadAction<Products>) => {
    return action.payload
  }
})

export default productsReducer