import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCodes} from "../../pages/api/Codes";

export const fetchCodes = createAsyncThunk(
  "Codes/fetchCodes",
  async function (_, {rejectWithValue}) {
    try {
      const response = await getCodes()
      return response.data
    }
    catch (error: any) {
      if (!error.message) throw error
      return rejectWithValue(error.message)
    }
  }
)