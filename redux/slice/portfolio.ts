import { firebaseHelper } from './../../helper/firebase'
import { RootState } from '@slice'
import { StoreStatus } from '@starter/redux/type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface IPortfolio {
  id: string
  position: number
  price: number
  symbol: string
}

export type PortfolioState = {
  status: StoreStatus
  portolio?: IPortfolio[]
}

export const portfolioAddRequest = createAsyncThunk(
  'portfolio/api/add',
  async ({ symbol, price, position }: { symbol: string; price: number; position: number }) => {
    const portolio = await firebaseHelper.addPortfolio({ symbol, price, position })
    return portolio
  }
)

export const portfolioGetRequest = createAsyncThunk('portfolio/api/get', async () => {
  const response = await firebaseHelper.getPortifolio()
  return response
})

export const portfolioDeleteRequest = createAsyncThunk(
  'portfolio/api/delete',
  async ({ id }: { id: string }, { dispatch }) => {
    await firebaseHelper.deletePortifolio(id)
    dispatch(portfolioGetRequest())
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
      .addCase(portfolioGetRequest.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(portfolioGetRequest.fulfilled, (state, action) => {
        state.status = 'success'
        state.portolio = action.payload
      })
      .addCase(portfolioGetRequest.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(portfolioDeleteRequest.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(portfolioDeleteRequest.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(portfolioDeleteRequest.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const portfolioActions = portfolioSlice.actions
export const portfolioSeletor = (state: RootState) => state.portfolio
