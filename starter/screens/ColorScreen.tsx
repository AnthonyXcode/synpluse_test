import { Text } from '@starter/component/Text'
import { colors } from '@starter/themes/colors'
import { size } from '@starter/themes/size'
import { StyleSheet, View } from 'react-native'

export default function ColorScreen() {
  return (
    <View style={styles.container}>
      {Object.keys(colors).map((key) => {
        const color = colors[key as 'danger'] || '#ffff'
        return (
          <View key={key} style={[styles.row, { backgroundColor: color }]}>
            <Text>{key}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    marginTop: size[2],
    padding: size[3],
    marginHorizontal: size[2],
  },
})
