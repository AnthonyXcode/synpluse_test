/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Login: NavigatorScreenParams<LoginParamList> | undefined
  Instrument: {
    symbol: string
    price?: string
  }
  AddInstrument: {
    symbol: string
  }
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  Main: undefined
  Portfolio: undefined
  Profile: undefined
}

export type LoginParamList = {
  Login: undefined
  Register: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type LoginScreenProps<Screen extends keyof LoginParamList> = CompositeScreenProps<
  NativeStackScreenProps<LoginParamList>,
  NativeStackScreenProps<RootStackParamList>
>
