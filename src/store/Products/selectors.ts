import {RootState} from '../index';
import {Product} from './types';

export const selectProducts = (state:RootState): Product[] => state.products