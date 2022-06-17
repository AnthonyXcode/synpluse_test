import { Button } from '@starter/component/Button'
import { size } from '@starter/themes/size'
import { StyleSheet, View } from 'react-native'

export default function ButtonScreen() {
  return (
    <View style={styles.container}>
      <Button title='Button Large' onPress={() => {}} />
      <Button title='Button Outline' onPress={() => {}} type='outline' />
      <Button title='Button No Border' onPress={() => {}} type='neat' />
      <View style={{ flexDirection: 'row' }}>
        <Button title='Small' onPress={() => {}} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button title='Small Outline' onPress={() => {}} type='outline' />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button title='Small No Border' onPress={() => {}} type='neat' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: size[5],
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
