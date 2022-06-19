import { RootState } from '@slice'
import { StoreStatus } from '@starter/redux/type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, apiKey } from '@starter/helper/api'

interface ISearchResult {
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

export type InstrumentsState = {
  status: StoreStatus
  searchResult: ISearchResult[]
}

export const instrumentsApiRequest = createAsyncThunk(
  'instruments/api/get',
  async ({ keyword }: { keyword: string }) => {
    const response = await api().get<{ bestMatches: ISearchResult[] }>(
      '/query',
      { function: 'SYMBOL_SEARCH', keywords: keyword, apikey: apiKey },
      { headers: { 'User-Agent': 'request', 'Access-Control-Allow-Origin': 'http://localhost:19006/' } }
    )
    return response.data?.bestMatches || []
  }
)

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
  },
})

export const instrumentsActions = instrumentsSlice.actions
export const instrumentsSeletor = (state: RootState) => state.instruments
