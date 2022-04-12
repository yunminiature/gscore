import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {useSelector, TypedUseSelectorHook, useDispatch} from 'react-redux'
import {priceReducer} from './Price/index';
import {usersReducer} from "./Users";
import {currentUserReducer} from "./CurrentUser";

const RootReducer = combineReducers({
  currentUser: currentUserReducer,
  users: usersReducer,
  price: priceReducer,
});

const PersistConfig = {
  key: 'root',
  storage,
}

const PersistedReducer = persistReducer(PersistConfig, RootReducer)

const store = configureStore({
  reducer: PersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
export {persistor};
