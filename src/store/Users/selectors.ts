import {RootState} from '../index';
import {UserType} from './types';

export const selectUsers = (state:RootState): UserType[] => state.users.users
