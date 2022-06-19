import { portfolioSlice, PortfolioState } from './portfolio'
import { instrumentsSlice, InstrumentsState } from './instruments'

export const Reducers = {
  [instrumentsSlice.name]: instrumentsSlice.reducer,
  [portfolioSlice.name]: portfolioSlice.reducer,
}

export interface RootState {
  [instrumentsSlice.name]: InstrumentsState
  [portfolioSlice.name]: PortfolioState
}
