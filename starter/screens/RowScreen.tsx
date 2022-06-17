import { RowHeader } from '@starter/component/RowHeader'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { size } from '@starter/themes/size'
import { Row } from '@starter/component/Row'
import { colors } from '@starter/themes/colors'
import { Entypo } from '@expo/vector-icons'
import { Text } from '@starter/component/Text'
import { SectionWrapper } from '@starter/component/Wrapper/SectionWrapper'

export default function RowScreen() {
  return (
    <View style={styles.container}>
      <RowHeader title='Header' />
      <RowHeader title='Header' description='Description' />
      <RowHeader
        title='Header'
        description='Description'
        rightIcon={<FontAwesome name='angle-down' size={24} color='black' />}
      />
      <Row title='Title' description='Description' />
      <Row
        title='Title'
        description='Description'
        rightIcon={<Entypo name='chevron-small-right' size={size[5]} color={colors.gray800} />}
      />
      <Row
        title='Title'
        description='Description'
        leftIcon={<FontAwesome name='gear' size={size[5]} color={colors.gray800} />}
      />
      <Row
        title='Title'
        description='Description'
        rightIcon={<Entypo name='chevron-small-right' size={size[5]} color={colors.gray800} />}
      />
      <Row>
        <View style={{ flex: 1 }}>
          <Text.H3>22-03-2022</Text.H3>
        </View>
        <View style={{ flex: 1 }}>
          <Text.H3>參考編號</Text.H3>
        </View>
        <View style={{ flex: 1 }}>
          <Text.H3>繳付金額</Text.H3>
        </View>
        <View>
          <Text.H3>狀態</Text.H3>
        </View>
      </Row>
      <RowHeader title='Header' />
      <SectionWrapper>
        <Row title='Title' description='Description' />
        <Row
          title='Title'
          description='Description'
          rightIcon={<Entypo name='chevron-small-right' size={size[5]} color={colors.gray800} />}
        />
        <Row
          title='Title'
          description='Description'
          leftIcon={<FontAwesome name='gear' size={size[5]} color={colors.gray800} />}
        />
        <Row
          title='Title'
          description='Description'
          rightIcon={<Entypo name='chevron-small-right' size={size[5]} color={colors.gray800} />}
        />
      </SectionWrapper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size[4],
    paddingVertical: size[3],
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
