import { size } from '@starter/themes/size'
import { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from './Text'

interface IProps {
  title: string
  description?: string
  rightIcon?: ReactElement
  onPress?: () => void
}

export const RowHeader = ({ title, description, rightIcon }: IProps) => {
  return (
    <View style={styles.container}>
      <Text.H2 style={styles.title}>{title}</Text.H2>
      {description && <Text.H2>{description}</Text.H2>}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size[3],
  },
  title: {
    flex: 1,
  },
  rightIcon: {
    marginRight: size[1],
  },
})
