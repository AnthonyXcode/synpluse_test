import { firebaseHelper } from './../../helper/firebase'
import { RootState } from '@slice'
import { StoreStatus } from '@starter/redux/type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type PortfolioState = {
  status: StoreStatus
}

export const portfolioAddRequest = createAsyncThunk(
  'portfolio/api/action',
  async ({ symbol, price, position }: { symbol: string; price: number; position: number }) => {
    await firebaseHelper.addPortfolio({ symbol, price, position })
  }
)

const initialState: PortfolioState = {
  status: 'idle',
}

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(portfolioAddRequest.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(portfolioAddRequest.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(portfolioAddRequest.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const portfolioActions = portfolioSlice.actions
export const portfolioSeletor = (state: RootState) => state.portfolio
