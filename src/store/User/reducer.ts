import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  SignInDto,
  User,
  UserDto
} from './types';
import {
  addPackage,
  signOutAction
} from './actions'
import {signIn, updateData} from "../../pages/api/User";

const initialState: User = {} as User

export const signInAction = createAsyncThunk(
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

export const updateDataAction = createAsyncThunk(
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
    state.package = action.payload
  },

  [signInAction.pending.type]: (state) => {
    state.status = "pending"
    state.error = ""
  },

  [signInAction.fulfilled.type]: (state, action: PayloadAction<User>) => {
    state.status = "resolved"
    state.token = action.payload.token
    state.user = action.payload.user
  },

  [signInAction.rejected.type]: (state, action: PayloadAction<string>) => {
    state.status = "rejected"
    state.error = action.payload
  },

  [signOutAction.type]: () => {
    return {} as User
  },

  [updateDataAction.pending.type]: (state) => {
    state.status = "pending"
    state.error = ""
  },

  [updateDataAction.fulfilled.type]: (state, action: PayloadAction<Omit<UserDto, "id">>) => {
    state.status = "resolved"
    state.user.email = action.payload.email
    state.user.username = action.payload.username
  },

  [updateDataAction.rejected.type]: (state, action: PayloadAction<string>) => {
    state.status = "rejected"
    state.error = action.payload
  }
})

export default userReducer