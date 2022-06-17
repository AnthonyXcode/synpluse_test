import { StoreStatus } from '@starter/redux/type'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './index'

export type LoginState = {
  status: StoreStatus
  isLoggedIn: boolean
}

const initialState: LoginState = {
  status: 'idle',
  isLoggedIn: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    },
    logout: (state) => {
      return { ...state, ...initialState }
    },
  },
  extraReducers: (builder) => {},
})

export const loginActions = loginSlice.actions
export const loginSeletor = (state: RootState) => state.login
