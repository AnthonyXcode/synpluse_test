import { Button } from '@starter/component/Button'
import { FormText } from '@starter/component/Form/FormText'
import { Spacing } from '@starter/component/Spacing'
import { StyleSheet, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { LoginScreenProps } from '../types'

interface IForm {
  email: string
  password: string
}

export default function LoginScreen({ navigation }: LoginScreenProps<'Login'>) {
  const auth = getAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>()

  const onPressRegister = () => {
    navigation.navigate('Register')
  }

  const onPressLogin = (value: IForm) => {
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <View style={styles.container}>
      <Controller
        name='email'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => {
          return <FormText title='Email' onChangeText={onChange} />
        }}
      />
      <Controller
        name='password'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => {
          return <FormText title='Password' onChangeText={onChange} isPaasword />
        }}
      />
      <Spacing height={20} />
      <Button title='Login' onPress={handleSubmit(onPressLogin)} />
      <Spacing height={40} />
      <Button title='Register' type='outline' onPress={onPressRegister} />
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
