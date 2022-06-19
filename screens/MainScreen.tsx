import { instrumentsApiRequest, instrumentsSeletor, ISearchResult } from '@slice/instruments'
import { Button } from '@starter/component/Button'
import { FormText } from '@starter/component/Form/FormText'
import { LoadingLottie } from '@starter/component/LoadingLottie'
import { Row } from '@starter/component/Row'
import { Icons } from '@starter/themes/icons'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View, SafeAreaView, FlatList, ListRenderItem, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootTabScreenProps } from '../types'

interface IFrom {
  keyword: string
}

export default function MainScreen({ navigation }: RootTabScreenProps<'Main'>) {
  const dispatch = useDispatch()
  const { status, searchResult } = useSelector(instrumentsSeletor)
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

  const onPressRow = (item: ISearchResult) => {}

  const renderItem: ListRenderItem<ISearchResult> = ({ item }) => {
    return (
      <Row rightIcon={<Icons name='right' />} onPress={() => onPressRow(item)}>
        <View style={{ flex: 1 }}>
          <Text>{`Symbol: ${item['1. symbol']}`}</Text>
          <Text>{`Name: ${item['2. name']}`}</Text>
          <Text>{`Type: ${item['3. type']}`}</Text>
          <Text>{`Region: ${item['4. region']}`}</Text>
        </View>
      </Row>
    )
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
        <FlatList
          style={styles.list}
          data={searchResult}
          renderItem={renderItem}
          keyExtractor={(item) => item['1. symbol']}
        />
        <LoadingLottie isVisible={status === 'loading'} isIndicator />
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
  list: {
    flex: 1,
  },
})
