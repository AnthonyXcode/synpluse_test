import { Button } from '@starter/component/Button'
import { FormText } from '@starter/component/Form/FormText'
import { Spacing } from '@starter/component/Spacing'
import { StyleSheet } from 'react-native'

import { View } from '../components/Themed'
import { LoginScreenProps } from '../types'

export default function LoginScreen({ navigation }: LoginScreenProps<'Login'>) {
  const onPressRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <FormText
        title='Phone'
        onChangeText={(account) => {
          console.log(account)
        }}
      />
      <FormText
        title='Password'
        onChangeText={(password) => {
          console.log(password)
        }}
      />
      <Spacing height={20} />
      <Button title='Login' onPress={() => {}} />
      <Spacing height={40} />
      <Button title='Register' type='outline' onPress={onPressRegister} />
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
