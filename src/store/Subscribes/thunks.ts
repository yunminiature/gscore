import {createAsyncThunk} from "@reduxjs/toolkit";
import {changeProduct, getSubscribes} from "../../pages/api/Subscribes";
import {ChangeProductDto} from "./types";

export const fetchSubscribes = createAsyncThunk(
  "Subscribes/fetchSubscribes",
  async function (_, {rejectWithValue}) {
    try {
      const response = await getSubscribes()
      return response.data
    }
    catch (error: any) {
      if (!error.message) throw error
      return rejectWithValue(error.message)
    }
  }
)

export const changeSubscribe = createAsyncThunk(
  "Subscribes/changeSubscribe",
  async function (SubscribeData:ChangeProductDto, ) {
    try{
      const {productId, subscribeId} = SubscribeData
      await changeProduct({productId, subscribeId})
    }
    catch (error:any){
    }
  }
)