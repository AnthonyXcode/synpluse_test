import { Alert, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../types'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from '@starter/component/Button'
import { Controller, useForm } from 'react-hook-form'
import { FormText } from '@starter/component/Form/FormText'
import { useDispatch, useSelector } from 'react-redux'
import { portfolioActions, portfolioAddRequest, portfolioSeletor } from '@slice/portfolio'
import { LoadingLottie } from '@starter/component/LoadingLottie'
import { useEffect } from 'react'

interface IForm {
  bidPrice: number
  position: number
}

export default function AddInstrumentModal({ navigation, route }: RootStackScreenProps<'AddInstrument'>) {
  const dispatch = useDispatch()
  const { status } = useSelector(portfolioSeletor)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>()

  useEffect(() => {
    if (status === 'success') {
      Alert.alert('Success', undefined, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(portfolioActions.resetStatus())
            navigation.goBack()
          },
        },
      ])
    } else if (status === 'failed') {
      Alert.alert('Failed', 'Please try again later.', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(portfolioActions.resetStatus())
          },
        },
      ])
    }
  }, [status])

  const onPressConfirm = (data: IForm) => {
    dispatch(portfolioAddRequest({ symbol: route.params.symbol, price: data.bidPrice, position: data.position }))
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
      <LoadingLottie isVisible={status === 'loading'} isIndicator={true} />
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
