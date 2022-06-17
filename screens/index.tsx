import Navigation from '../navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { StyleSheet, View } from 'react-native'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const Screens = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      console.log({ user })
    })
  }, [])

  return (
    <ActionSheetProvider>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.navigationContainer}>
          <Navigation isLoggedIn={isLoggedIn} />
        </View>
        <StatusBar />
      </SafeAreaProvider>
    </ActionSheetProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navigationContainer: {
    maxWidth: 800,
    flex: 1,
  },
})
