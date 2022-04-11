import {RootState} from '../index';
import {PriceCardType} from './types';

export const selectPrice = (state:RootState): PriceCardType[] => state.price.price
