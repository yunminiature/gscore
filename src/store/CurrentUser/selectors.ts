import {RootState} from '../index';
import {CurrentUserType} from './types';

export const selectCurrentUser = (state:RootState): CurrentUserType => state.currentUser
