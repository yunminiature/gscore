import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  SignInDto,
  User,
  UserDto
} from './types';
import {
  addCurrentSubscribe,
  addPackage,
  signOutAction
} from './actions'
import {signIn, updateData} from "../../pages/api/User";

const initialState: User = {} as User

export const signInAsyncAction = createAsyncThunk(
  "User/signInAction",
  async function (userData:SignInDto, {rejectWithValue}) {
    const {email, password} = userData
    try {
      const response = await signIn({email, password})
      return response.data
    }
    catch (error: any) {
      if (!error.message) throw error
      return rejectWithValue(error.message)
    }
  }
)

export const updateDataAsyncAction = createAsyncThunk(
  "User/updateDataAction",
  async function (userData:Omit<UserDto, "id">, {rejectWithValue}) {
    const {username, email} = userData
    try {
      const response = await updateData({username, email})
      return response.data
    }
    catch (error: any) {
      if (!error.message) throw error
      return rejectWithValue(error.message)
    }
  }
)

const userReducer = createReducer<User>(initialState, {
  [addPackage.type]: (state, action: PayloadAction<number>) => {
    state.userPackage = action.payload
  },

  [addCurrentSubscribe.type]: (state, action: PayloadAction<number>) => {
    state.currentSubscribe = action.payload
  },

  [signInAsyncAction.pending.type]: (state) => {
    state.signInLoading = true
    state.error = ""
  },

  [signInAsyncAction.fulfilled.type]: (state, action: PayloadAction<User>) => {
    state.signInLoading = false
    state.token = action.payload.token
    state.user = action.payload.user
  },

  [signInAsyncAction.rejected.type]: (state, action: PayloadAction<string>) => {
    state.signInLoading = false
    state.error = action.payload
  },

  [signOutAction.type]: () => {
    return {} as User
  },

  [updateDataAsyncAction.pending.type]: (state) => {
    state.updateDataLoading = true
    state.error = ""
  },

  [updateDataAsyncAction.fulfilled.type]: (state, action: PayloadAction<Omit<UserDto, "id">>) => {
    state.updateDataLoading = false
    state.user.email = action.payload.email
    state.user.username = action.payload.username
  },

  [updateDataAsyncAction.rejected.type]: (state, action: PayloadAction<string>) => {
    state.updateDataLoading = false
    state.error = action.payload
  }
})

export default userReducer