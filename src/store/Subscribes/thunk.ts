import {createAsyncThunk} from "@reduxjs/toolkit";
import {getSubscribes} from "../../pages/api/Subscribes";

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