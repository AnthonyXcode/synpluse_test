import { Text } from '@starter/component/Text'
import { StyleSheet, View } from 'react-native'

export default function TextScreen() {
  return (
    <View style={styles.container}>
      <Text.H1>{'Header 1'}</Text.H1>
      <Text.H2>{'Header 2'}</Text.H2>
      <Text.H3>{'Header 3'}</Text.H3>
      <Text>{'Text'}</Text>
      <Text.Description>{'Description'}</Text.Description>
      <Text.Caption>{'Caption'}</Text.Caption>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
