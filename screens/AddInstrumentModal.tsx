import { StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../types'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from '@starter/component/Button'
import { Controller, useForm } from 'react-hook-form'
import { FormText } from '@starter/component/Form/FormText'

interface IForm {
  bidPrice: number
  position: number
}

export default function AddInstrumentModal({ navigation }: RootStackScreenProps<'AddInstrument'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>()

  const onPressConfirm = (data: IForm) => {
    console.log(data)
  }

  const onPressCancel = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Controller
        name='bidPrice'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => {
          return (
            <FormText
              title='Bid Price'
              onChangeText={(text) => onChange(Number(text))}
              error={errors.position?.message}
              keyboardType='numeric'
            />
          )
        }}
      />
      <Controller
        name='position'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => {
          return (
            <FormText
              title='Position'
              onChangeText={(text) => onChange(Number(text))}
              error={errors.position?.message}
              keyboardType='numeric'
            />
          )
        }}
      />
      <Button title='Confirm' onPress={handleSubmit(onPressConfirm)} style={styles.btn} />
      <Button title='Cancel' type='outline' onPress={onPressCancel} style={styles.btn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btn: {
    marginVertical: 20,
  },
})
