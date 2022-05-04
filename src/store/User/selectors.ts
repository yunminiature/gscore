import {RootState} from '../index';
import {User} from './types';
import { createSelector } from "reselect";

export const selectUser = (state:RootState): User => state.user

export const selectToken = createSelector(
  selectUser,
  user => user.token
)

export const selectPackage = createSelector(
  selectUser,
  user => user.userPackage
)
export const selectCurrentSubscribe = createSelector(
  selectUser,
  user => user.currentSubscribe
)