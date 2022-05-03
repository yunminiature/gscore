import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Products, Product} from './types';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getProducts} from "../../pages/api/Products";

const initialState: Products = {} as Products

export const fetchProducts = createAsyncThunk(
  "Products/fetchProducts",
  async function (_, {rejectWithValue}) {
    try {
      const response = await getProducts()
      return response.data
    }
    catch (error: any) {
      if (!error.message) throw error
      return rejectWithValue(error.message)
    }
  }
)

const productsReducer = createReducer<Products>(initialState, {
  [fetchProducts.pending.type]: (state) => {
    state.productsLoading = true
  },
  [fetchProducts.fulfilled.type]: (state, action: PayloadAction<Product[]>) => {
    state.productsLoading = false
    state.products = action.payload
  },
  [fetchProducts.rejected.type]: (state, action: PayloadAction<string>) => {
    state.productsLoading = false
    state.error = action.payload
  }
})

export default productsReducer