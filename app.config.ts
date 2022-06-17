import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
  if (process.env.ENVIRONMENT === 'production') {
    const name = 'example_mobile'
    const identifier = 'com.example.app'
    return {
      ...config,
      slug: name,
      name: name,
      ios: { ...config.ios, bundleIdentifier: identifier },
      android: { ...config.android, package: identifier },
    }
  } else {
    const name = 'example_mobile_dev'
    const identifier = 'com.example.app.dev'
    return {
      ...config,
      slug: name,
      name: name,
      ios: { ...config.ios, bundleIdentifier: identifier },
      android: { ...config.android, package: identifier },
    }
  }
}
