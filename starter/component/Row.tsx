import { colors } from '@starter/themes/colors'
import { size } from '@starter/themes/size'
import { ReactElement, ReactNode } from 'react'
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native'
import { Text } from './Text'

interface IRowProps {
  title?: string
  description?: string
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  children?: ReactNode
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
}

export const Row = ({ title, description, leftIcon, rightIcon, children, onPress, containerStyle }: IRowProps) => {
  const Content = () => (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!description && (
        <Text style={styles.description} selectable>
          {description}
        </Text>
      )}
      {children}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  )

  if (onPress) {
    return <Pressable onPress={onPress}>{<Content />}</Pressable>
  } else {
    return <Content />
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: size[4],
    paddingVertical: size[3],
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomColor: colors.gray400,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftIcon: {
    marginRight: size[4],
  },
  rightIcon: {},
  description: {
    color: colors.gray800,
    textAlign: 'right',
  },
  title: {
    flex: 1,
  },
})
