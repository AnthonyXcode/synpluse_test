import { instrumentsApiRequest } from '../instruments'
import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('test instrumentsApiRequest', () => {
  it('should return array of instruments when search keyword', async () => {
    const result = [
      {
        '1. symbol': 'IBM',
        '2. name': 'International Business Machines Corp',
        '3. type': 'Equity',
        '4. region': 'United States',
        '5. marketOpen': '09:30',
        '6. marketClose': '16:00',
        '7. timezone': 'UTC-04',
        '8. currency': 'USD',
        '9. matchScore': '1.0000',
      },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet('/query').reply(200, {
      bestMatches: result,
    })

    const store = configureStore({
      reducer: function (state = '', action) {
        console.log({ action })
        switch (action.type) {
          case 'instruments/api/get/fulfilled':
            return action.payload
          default:
            return state
        }
      },
    })
    await store.dispatch(instrumentsApiRequest({ keyword: 'IBM' }))
    const state = store.getState()
    expect(state.length).toEqual(1)
    expect(state).toEqual(result)
  })
})
