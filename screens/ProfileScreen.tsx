import { StyleSheet, View, ScrollView } from 'react-native'
import { RootTabScreenProps } from '../types'
import { getAuth, signOut } from 'firebase/auth'
import { Row } from '@starter/component/Row'
import { Button } from '@starter/component/Button'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  const auth = getAuth()
  if (!auth.currentUser) {
    return null
  }

  const { email, displayName, uid } = auth.currentUser

  const onPressLogout = () => {
    signOut(auth)
      .then((result) => console.log({ result }))
      .catch((error) => console.error(error))
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Row title='uid' description={uid || '-'} />
        <Row title='email' description={email || '-'} />
        <Row title='Display name' description={displayName || '-'} />
        <Button title='Log out' onPress={onPressLogout} style={styles.logout} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logout: {
    margin: 20,
  },
})
