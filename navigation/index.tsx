/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@screens/LoginScreen'
import ProfileScreen from '@screens/ProfileScreen'
import RegisterScreen from '@screens/RegisterScreen'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import { LoginParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import MainScreen from '../screens/MainScreen'
import PortfolioScreen from '../screens/PortfolioScreen'
import InstrumentScreen from '@screens/InstrumentScreen'
import AddInstrumentModal from '@screens/AddInstrumentModal'

export default function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Root' : 'Login'} screenOptions={{ headerShown: false }}>
      {isLoggedIn && <Stack.Screen name='Root' component={BottomTabNavigator} />}
      {!isLoggedIn && <Stack.Screen name='Login' component={LoginNavigation} />}
      {isLoggedIn && (
        <Stack.Screen
          name='Instrument'
          component={InstrumentScreen}
          options={({ route }) => ({ headerShown: true, headerTitle: route.params.symbol, headerBackTitle: '' })}
        />
      )}
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='AddInstrument' component={AddInstrumentModal} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const LoginStack = createNativeStackNavigator<LoginParamList>()

function LoginNavigation() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name='Login' component={LoginScreen} />
      <LoginStack.Screen name='Register' component={RegisterScreen} />
    </LoginStack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='Main'
        component={MainScreen}
        options={({ navigation }: RootTabScreenProps<'Main'>) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='finance' size={30} color={color} />,
        })}
      />
      <BottomTab.Screen
        name='Portfolio'
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name='list' size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ title: 'Profile', tabBarIcon: ({ color }) => <AntDesign name='user' size={24} color={color} /> }}
      />
    </BottomTab.Navigator>
  )
}
