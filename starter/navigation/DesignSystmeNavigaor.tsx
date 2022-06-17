import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DesignSystemScreen from '@starter/screens/DesignSystemScreen'
import RowScreen from '@starter/screens/RowScreen'
import TextScreen from '@starter/screens/TextScreen'
import TypographyScreen from '@starter/screens/TypographyScreen'
import ColorScreen from '@starter/screens/ColorScreen'
import { DesignSystemStackParamList } from './types'
import ButtonScreen from '@starter/screens/ButtonScreen'
import InputChipScreen from '@starter/screens/InputChipScreen'
import BadgeScreen from '@starter/screens/BadgeScreen'
import FormScreen from '@starter/screens/FormScreen'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<DesignSystemStackParamList>()

export const DesignSystemNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='DesignSystem' component={DesignSystemScreen} options={{ title: 'Design System' }} />
      <Stack.Screen name='Typography' component={TypographyScreen} options={{ title: 'Typography' }} />
      <Stack.Screen name='Row' component={RowScreen} options={{ title: 'Row' }} />
      <Stack.Screen name='Text' component={TextScreen} options={{ title: 'Text' }} />
      <Stack.Screen name='Color' component={ColorScreen} />
      <Stack.Screen name='Button' component={ButtonScreen} />
      <Stack.Screen name='InputChip' component={InputChipScreen} />
      <Stack.Screen name='Badge' component={BadgeScreen} />
      <Stack.Screen name='Form' component={FormScreen} />
    </Stack.Navigator>
  )
}
