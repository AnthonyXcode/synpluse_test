import { create } from 'apisauce'
import Constants from 'expo-constants'

export type Secret = {
  plainTextToken: string
}

export const urlencodedHeader = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

export const apiKey = Constants.manifest?.extra?.apiKey

// define the api
export const api = (secret?: Secret) => {
  return create({
    baseURL: Constants.manifest?.extra?.baesUrl,
    withCredentials: true,
  })
}
