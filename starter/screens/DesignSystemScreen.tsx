import { Row } from '@starter/component/Row'
import { DesignSystemStackParamList, DesignSystemStackScreenProps } from '@starter/navigation/types'
import { StyleSheet, View, FlatList } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { size } from '@starter/themes/size'
import { colors } from '@starter/themes/colors'

export default function DesignSystemScreen({ navigation }: DesignSystemStackScreenProps<'DesignSystem'>) {
  const sections = [
    { id: 'Text', title: 'Text' },
    { id: 'Color', title: 'Color' },
    { id: 'Button', title: 'Button' },
    { id: 'InputChip', title: 'Input Chip' },
    { id: 'Badge', title: 'Badge' },
    { id: 'Form', title: 'Form' },
    { id: 'Row', title: 'Row' },
  ]
  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Row
              title={item.title}
              onPress={() => navigation.navigate(item.id as keyof DesignSystemStackParamList)}
              rightIcon={<Entypo name='chevron-small-right' size={size[5]} color={colors.gray800} />}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
