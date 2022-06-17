import { InputChip } from '@starter/component/InputChip'
import { size } from '@starter/themes/size'
import { StyleSheet, View } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'

export default function InputChipScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InputChip title='Input Chip' />
      </View>
      <View style={styles.content}>
        <InputChip title='Input Chip' right={<AntDesign name='close' size={16} color='black' />} />
      </View>
      <View style={styles.content}>
        <InputChip title='Input Chip' left={<Ionicons name='ios-image' size={20} color='black' />} />
      </View>
      <View style={styles.content}>
        <InputChip
          title='Input Chip'
          left={<Ionicons name='ios-image' size={20} color='black' />}
          right={<AntDesign name='close' size={16} color='black' />}
        />
      </View>
      <View style={styles.content}>
        <InputChip title='Input Chip' type='hightLight' />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
