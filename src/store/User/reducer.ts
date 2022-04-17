import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {User} from './types';
import {
  addPackage,
  signInAction
} from './actions'

const initialState: User = {} as User

const userReducer = createReducer<User>(initialState, {
  [addPackage.type]: (state, action: PayloadAction<number>) => {
    state.package = action.payload
  },

  [signInAction.type]: (state, action: PayloadAction<Omit<User, "package">>) => {
    state.token = action.payload.token
    state.user = {
      ...action.payload.user
    }
  }
})

export default userReducer