import { portfolioSlice, PortfolioState } from './portfolio'
import { instrumentsSlice, InstrumentsState } from './instruments'
import { loginSlice, LoginState } from './login'

export const Reducers = {
  [loginSlice.name]: loginSlice.reducer,
  [instrumentsSlice.name]: instrumentsSlice.reducer,
  [portfolioSlice.name]: portfolioSlice.reducer,
}

export interface RootState {
  [loginSlice.name]: LoginState
  [instrumentsSlice.name]: InstrumentsState
  [portfolioSlice.name]: PortfolioState
}
