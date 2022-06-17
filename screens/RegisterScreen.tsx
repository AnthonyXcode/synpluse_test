import { Button } from '@starter/component/Button'
import { FormText } from '@starter/component/Form/FormText'
import { Spacing } from '@starter/component/Spacing'
import { StyleSheet } from 'react-native'

import { View } from '../components/Themed'
import { LoginScreenProps } from '../types'

export default function RegisterScreen({ navigation }: LoginScreenProps<'Register'>) {
  const onPressConfirm = () => {}

  return (
    <View style={styles.container}>
      <FormText
        onChangeText={(account) => {
          console.log(account)
        }}
      />
      <FormText
        onChangeText={(password) => {
          console.log(password)
        }}
      />
      <Spacing height={20} />
      <Button title='Confirm' onPress={onPressConfirm} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
