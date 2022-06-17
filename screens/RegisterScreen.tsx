import { Button } from '@starter/component/Button'
import { FormText } from '@starter/component/Form/FormText'
import { Alert, StyleSheet, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { LoginScreenProps } from '../types'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

interface IForm {
  email: string
  password: string
}

export default function RegisterScreen({ navigation }: LoginScreenProps<'Register'>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>()

  const auth = getAuth()

  const onPressConfirm = (value: IForm) => {
    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then((user) => {
        console.log(user)
        Alert.alert('Success', 'Please use your email and password to login.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login')
            },
          },
        ])
      })
      .catch((error) => {
        console.error(error)
        Alert.alert('Invalid', 'This email is invalid or has been registered. Please use another email.', [
          { text: 'OK' },
        ])
      })
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <FormText title='E-mail' onChangeText={onChange} text={value} error={errors.email?.message} />
        )}
        name='email'
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <FormText title='Password' onChangeText={onChange} text={value} error={errors.password?.message} isPaasword />
        )}
        name='password'
      />
      <Button title='Confirm' onPress={handleSubmit(onPressConfirm)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
