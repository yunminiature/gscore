import {createAsyncThunk} from "@reduxjs/toolkit";
import {activateCode, getCodes, manageCodes} from "../../pages/api/Codes";
import {ManageCodesDto} from "./types";

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

export const activateCodeAsyncAction = createAsyncThunk(
  "Codes/activateCode",
  async function (code:string) {
    try {
      await activateCode({code})
    }
    catch (error: any) {
    }
  }
)

export const manageCodesAsyncAction = createAsyncThunk(
  "Codes/manageCodes",
  async function (codesData:ManageCodesDto){
    const {codesIds, subscribeId} = codesData
    try{
      await manageCodes({codesIds, subscribeId})
    }
    catch (error: any) {
    }
  }
)