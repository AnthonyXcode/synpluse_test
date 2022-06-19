import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  Image,
  Linking,
  Pressable,
} from 'react-native'
import { RootStackScreenProps } from '../types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { INews, instrumentApiRequest, instrumentsSeletor } from '@slice/instruments'
import { LoadingLottie } from '@starter/component/LoadingLottie'
import { Text } from '@starter/component/Text'
import { Row } from '@starter/component/Row'
import { Button } from '@starter/component/Button'

export default function InstrumentScreen({ navigation, route }: RootStackScreenProps<'Instrument'>) {
  const dispatch = useDispatch()
  const { currentInstrument } = useSelector(instrumentsSeletor)

  useEffect(() => {
    dispatch(instrumentApiRequest({ symbol: route.params.symbol }))
    navigation.setParams({ price: currentInstrument?.price?.['05. price'] })
  }, [])

  const renderNews: ListRenderItem<INews> = ({ item }) => {
    return (
      <Pressable onPress={() => Linking.openURL(item.url)}>
        <View style={styles.rowContainer}>
          {!!item.banner_image && <Image style={styles.image} source={{ uri: item.banner_image }} />}
          <Text.H2 numberOfLines={2} ellipsizeMode='tail'>
            {item.title}
          </Text.H2>
          <Text.Description numberOfLines={3} ellipsizeMode='tail'>
            {item.summary}
          </Text.Description>
        </View>
      </Pressable>
    )
  }

  const onPressAddToPortfolio = () => {
    navigation.navigate('AddInstrument', { symbol: route.params.symbol })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Row title='Price' description={currentInstrument?.price?.['05. price']} />
          <Row title='Hight' description={currentInstrument?.price?.['03. high']} />
          <Row title='Low' description={currentInstrument?.price?.['04. low']} />
          <Row title='Volumn' description={currentInstrument?.price?.['06. volume']} />
        </View>
        <FlatList data={currentInstrument?.news} renderItem={renderNews} keyExtractor={(item) => item.url} />
        <Button title={'Add to Portfolio'} onPress={onPressAddToPortfolio} style={styles.btn} />
      </View>
      <LoadingLottie isVisible={!currentInstrument} isIndicator />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  image: {
    width: Dimensions.get('screen').width - 40,
    height: 250,
  },
  btn: {
    padding: 20,
  },
})
