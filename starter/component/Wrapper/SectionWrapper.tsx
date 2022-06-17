import { colors } from '@starter/themes/colors'
import { size } from '@starter/themes/size'
import { ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface IProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const SectionWrapper = ({ children, style, onPress }: IProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, style]}>{children}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: size[2],
    borderColor: colors.gray400,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
})
