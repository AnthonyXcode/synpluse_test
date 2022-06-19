import { RootState } from '@slice'
import { StoreStatus } from '@starter/redux/type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type PortfolioState = {
  status: StoreStatus
}

export const portfolioApiRequest = createAsyncThunk('portfolio/api/action', async () => {})

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
    resetLogin: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(portfolioApiRequest.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(portfolioApiRequest.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(portfolioApiRequest.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const portfolioActions = portfolioSlice.actions
export const portfolioSeletor = (state: RootState) => state.portfolio
