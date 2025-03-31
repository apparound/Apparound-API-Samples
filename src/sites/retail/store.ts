import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer from './features/appSlice'
import quoteReducer from './features/quoteSlize'

const persistConfig = {
    key: 'root',
    storage,
}

const combinedReducers = combineReducers({
    app: appReducer,
    quote: quoteReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)
