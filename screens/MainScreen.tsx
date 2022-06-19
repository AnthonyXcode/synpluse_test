import { instrumentsApiRequest } from '@slice/instruments'
import { Button } from '@starter/component/Button'
import { FormText } from '@starter/component/Form/FormText'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux'
import { RootTabScreenProps } from '../types'

interface IFrom {
  keyword: string
}

export default function MainScreen({ navigation }: RootTabScreenProps<'Main'>) {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFrom>()

  const onPressSearch = (data: IFrom) => {
    if (!data.keyword) {
      return
    }
    dispatch(instrumentsApiRequest({ keyword: data.keyword }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <View style={styles.input}>
            <Controller
              control={control}
              name='keyword'
              rules={{ required: true }}
              render={({ field: { onChange } }) => {
                return (
                  <FormText
                    title='instrument'
                    onChangeText={onChange}
                    placeHolder='Please enter here...'
                    error={errors.keyword?.message}
                  />
                )
              }}
            />
          </View>
          <Button title='Search' onPress={handleSubmit(onPressSearch)} />
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
