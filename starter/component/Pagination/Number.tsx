import { colors } from '@starter/themes/colors'
import React, { FC, memo, useCallback } from 'react'
import { Pressable, View } from 'react-native'

import { Text } from '../Text'

import { styles } from './styles'

interface IPaginationNumber {
  isCurrentPage: boolean
  onPress: (page: number) => void
  page: number | null
}

export const PaginationNumber: FC<IPaginationNumber> = memo(({ page, isCurrentPage, onPress }) => {
  const handlePageChange = useCallback(() => {
    onPress(page!)
  }, [onPress, page])

  const isSpacer = page === null

  return isSpacer ? (
    <View style={styles.spacer}>
      <Text>...</Text>
    </View>
  ) : (
    <Pressable onPress={handlePageChange}>
      <View style={[styles.box, styles.number]}>
        <Text
          style={{
            color: isCurrentPage ? colors.primary : colors.dark,
            textDecorationLine: isCurrentPage ? 'underline' : 'none',
          }}
        >
          {page.toString()}
        </Text>
      </View>
    </Pressable>
  )
})
