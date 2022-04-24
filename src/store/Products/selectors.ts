import {RootState} from '../index';
import {Products} from './types';

export const selectProducts = (state:RootState): Products => state.products