import {RootState} from '../index';
import {User} from './types';

export const selectUser = (state:RootState): User => state.user