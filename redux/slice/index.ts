import { loginSlice, LoginState } from './login'

export const Reducers = {
  [loginSlice.name]: loginSlice.reducer,
}

export interface RootState {
  [loginSlice.name]: LoginState
}
