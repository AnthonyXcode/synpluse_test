import { instrumentsSlice, InstrumentsState } from './instruments'
import { loginSlice, LoginState } from './login'

export const Reducers = {
  [loginSlice.name]: loginSlice.reducer,
  [instrumentsSlice.name]: instrumentsSlice.reducer,
}

export interface RootState {
  [loginSlice.name]: LoginState
  [instrumentsSlice.name]: InstrumentsState
}
