import React from 'react'
import redux from '@starter/redux'
import useCachedResources from './hooks/useCachedResources'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

const { store, persistor } = redux()
import i18n from 'i18n-js'
import * as Localization from 'expo-localization'
import { defaultTranslation } from '@starter/helper/i18n'
import { Screens } from './screens'
import { firebaseHelper } from './helper/firebase'

i18n.translations = defaultTranslation()
i18n.locale = Localization.locale
i18n.fallbacks = true

export default function App() {
  const isLoadingComplete = useCachedResources()
  firebaseHelper.initFirebase()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Screens />
        </PersistGate>
      </Provider>
    )
  }
}
