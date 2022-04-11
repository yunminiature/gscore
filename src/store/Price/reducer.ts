import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {PriceCardType, PriceType} from './types';

const initialState: PriceType = {
  price: [
    {
      id: 1,
      title: "Single site license",
      description: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
      price: 77,
      properties: ["Single site license", "Special introductory pricing", "Unlimited Pages and Keywords", "Billed annually"]
    },
    {
      id: 3,
      title: "3 Site license",
      description: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
      price: 117,
      properties: ["All features for 3 sites", "Special introductory pricing", "Unlimited Pages and Keywords", "Billed annually"]
    },
    {
      id: 10,
      title: "10 Site license",
      description: "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
      price: 167,
      properties: ["All features for 10 sites", "Special introductory pricing", "Unlimited Pages and Keywords", "Billed annually"]
    }
  ]
}

const priceReducer = createReducer<PriceType>(initialState, {})

export default priceReducer