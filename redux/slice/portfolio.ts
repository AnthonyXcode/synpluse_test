import { IInstrument } from './instruments'
import { api, apiKey } from './../../starter/helper/api'
import { firebaseHelper } from './../../helper/firebase'
import { RootState } from '@slice'
import { StoreStatus } from '@starter/redux/type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface IPortfolio {
  id: string
  position: number
  price: number
  symbol: string
  currentPrice: number
  gains: number
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
  const portfolio = await firebaseHelper.getPortifolio()
  const portfolioWithMarketPrice: IPortfolio[] = await Promise.all(portfolio.map((p) => getPortfolioWithMarketPrice(p)))
  return portfolioWithMarketPrice
})

const getPortfolioWithMarketPrice = async (item: IPortfolio) => {
  const price = await api().get<{ 'Global Quote': IInstrument }>('/query', {
    function: 'GLOBAL_QUOTE',
    symbol: item.symbol,
    apikey: apiKey,
  })
  const currentPrice = Number(price.data?.['Global Quote']['05. price']) || 0
  const gains = Number(((item.price - currentPrice) * item.position).toFixed(2))
  return { ...item, currentPrice, gains }
}

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
