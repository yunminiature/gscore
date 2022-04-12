import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {CurrentUserType} from './types';
import {addCurrentUser, addPackage} from './actions'

const initialState: CurrentUserType = {
  currentUser:{
    id: 0,
    packageId: 0
  }
}

const currentUserReducer = createReducer<CurrentUserType>(initialState, {
  [addCurrentUser.type]: (state, action: PayloadAction<number>) => {
    state.currentUser.id = action.payload
  },
  [addPackage.type]: (state, action: PayloadAction<number>) => {
    state.currentUser.packageId = action.payload
  }
})

export default currentUserReducer