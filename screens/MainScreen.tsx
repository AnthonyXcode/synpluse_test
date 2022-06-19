import { Button } from '@starter/component/Button'
import { FormText } from '@starter/component/Form/FormText'
import { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { RootTabScreenProps } from '../types'

export default function MainScreen({ navigation }: RootTabScreenProps<'Main'>) {
  const [instrument, setInstrument] = useState('')
  const onPressSearch = () => {
    console.log(instrument)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <View style={styles.input}>
            <FormText title='instrument' onChangeText={setInstrument} placeHolder='Please enter here...' />
          </View>
          <Button title='Search' onPress={onPressSearch} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    marginRight: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
})
