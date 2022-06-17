import { Badge } from '@starter/component/Badge'
import { size } from '@starter/themes/size'
import { StyleSheet, View } from 'react-native'

export default function BadgeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Badge title={'Label'} />
      </View>
      <View style={styles.content}>
        <Badge title={'Label'} type='warning' />
      </View>
      <View style={styles.content}>
        <Badge title={'Label'} type='danger' />
      </View>
      <View style={styles.content}>
        <Badge title={'Label'} type='info' />
      </View>
      <View style={styles.content}>
        <Badge title={'Label'} type='other' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size[5],
  },
  content: {
    marginBottom: size[5],
  },
})
