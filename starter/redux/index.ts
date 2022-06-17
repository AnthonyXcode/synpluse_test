import { exampleSlice } from '@starter/slice/example'
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Reducers } from '../../redux/slice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ ...Reducers, example: exampleSlice.reducer }))

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), logger],
  })
  const persistor = persistStore(store)
  return { store, persistor }
}
