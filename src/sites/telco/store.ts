import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import quoteReducer from '@/sites/retail/features/quoteSlice'

const persistConfig = {
   key: 'root',
   storage,
}

const rootReducer = combineReducers({
   quote: quoteReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
         },
      })
   },
   devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
