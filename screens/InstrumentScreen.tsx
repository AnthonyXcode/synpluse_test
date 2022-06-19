import { StyleSheet, View, ScrollView } from 'react-native'
import { RootStackScreenProps } from '../types'
import { getAuth } from 'firebase/auth'

export default function InstrumentScreen({ navigation }: RootStackScreenProps<'Instrument'>) {
  const auth = getAuth()
  if (!auth.currentUser) {
    return null
  }

  return (
    <ScrollView>
      <View style={styles.container}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
