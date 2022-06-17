import Navigation from '../navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { StyleSheet, View } from 'react-native'

export const Screens = () => {
  return (
    <ActionSheetProvider>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.navigationContainer}>
          <Navigation isLoggedIn={false} />
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
