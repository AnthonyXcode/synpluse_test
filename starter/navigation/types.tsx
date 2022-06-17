import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type DesignSystemStackParamList = {
  Typography: undefined
  DesignSystem: undefined
  Row: undefined
  Text: undefined
  Color: undefined
  Button: undefined
  InputChip: undefined
  Badge: undefined
  Form: undefined
}

export type DesignSystemStackScreenProps<Screen extends keyof DesignSystemStackParamList> = NativeStackScreenProps<
  DesignSystemStackParamList,
  Screen
>
