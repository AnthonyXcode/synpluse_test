import { IPortfolio, portfolioDeleteRequest, portfolioGetRequest, portfolioSeletor } from '@slice/portfolio'
import { LoadingLottie } from '@starter/component/LoadingLottie'
import { Row } from '@starter/component/Row'
import { Text } from '@starter/component/Text'
import { colors } from '@starter/themes/colors'
import { Icons } from '@starter/themes/icons'
import { useEffect } from 'react'
import { StyleSheet, View, FlatList, ListRenderItem, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'

export default function PortfolioScreen() {
  const { status, portolio } = useSelector(portfolioSeletor)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(portfolioGetRequest())
  }, [])

  const onPressDelete = (item: IPortfolio) => {
    Alert.alert(`Do you want to delete ${item.symbol} from your portfolio?`, undefined, [
      { text: 'Yes', onPress: () => dispatch(portfolioDeleteRequest({ id: item.id })) },
      { text: 'No' },
    ])
  }

  const renderItem: ListRenderItem<IPortfolio> = ({ item }) => {
    return (
      <Row
        rightIcon={
          <AntDesign
            name='delete'
            size={24}
            color='black'
            onPress={() => {
              onPressDelete(item)
            }}
          />
        }
      >
        <View style={styles.cellContainer}>
          <Text.H2>{`Symbol: ${item.symbol}`}</Text.H2>
          <Text>{`Position ${item.position}`}</Text>
          <Text>{`Price: ${item.price}`}</Text>
        </View>
      </Row>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={portolio} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <LoadingLottie isVisible={status === 'loading'} isIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cellContainer: {
    flex: 1,
  },
})
