import { RootState } from '@slice'
import { StoreStatus } from '@starter/redux/type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, apiKey } from '@starter/helper/api'

export interface ISearchResult {
  '1. symbol': string
  '2. name': string
  '3. type': string
  '4. region': string
  '5. marketOpen': string
  '6. marketClose': string
  '7. timezone': string
  '8. currency': string
  '9. matchScore': string
}

export interface INews {
  title: string
  banner_image: string
  summary: string
  url: string
  time_published: string
}

export interface IInstrument {
  '01. symbol': string
  '02. open': string
  '03. high': string
  '04. low': string
  '05. price': string
  '06. volume': string
  '07. latest trading day': string
  '08. previous close': string
  '09. change': string
  '10. change percent': string
}

export type InstrumentsState = {
  status: StoreStatus
  searchResult: ISearchResult[]
  currentInstrument?: {
    price?: IInstrument
    news?: INews[]
  }
}

export const instrumentsApiRequest = createAsyncThunk(
  'instruments/api/get',
  async ({ keyword }: { keyword: string }) => {
    const priceResponse = await api().get<{ bestMatches: ISearchResult[] }>('/query', {
      function: 'SYMBOL_SEARCH',
      keywords: keyword,
      apikey: apiKey,
    })
    return priceResponse.data?.bestMatches || []
  }
)

export const instrumentApiRequest = createAsyncThunk('instrument/api/get', async ({ symbol }: { symbol: string }) => {
  const response = await api().get<{ 'Global Quote': IInstrument }>('/query', {
    function: 'GLOBAL_QUOTE',
    symbol,
    apikey: apiKey,
  })
  const newsResponse = await api().get<{ feed: INews[] }>('/query', {
    function: 'NEWS_SENTIMENT',
    tickers: symbol,
    apikey: apiKey,
  })
  return { price: response.data?.['Global Quote'], news: newsResponse.data?.feed }
})

const initialState: InstrumentsState = {
  status: 'idle',
  searchResult: [],
}

export const instrumentsSlice = createSlice({
  name: 'instruments',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(instrumentsApiRequest.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(instrumentsApiRequest.fulfilled, (state, action) => {
        state.status = 'success'
        state.searchResult = action.payload
      })
      .addCase(instrumentsApiRequest.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(instrumentApiRequest.pending, (state, action) => {
        state.currentInstrument = undefined
      })
      .addCase(instrumentApiRequest.fulfilled, (state, action) => {
        state.currentInstrument = action.payload
      })
  },
})

export const instrumentsActions = instrumentsSlice.actions
export const instrumentsSeletor = (state: RootState) => state.instruments
