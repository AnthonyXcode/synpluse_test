import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
  if (process.env.ENVIRONMENT === 'production') {
    const name = 'synpluse'
    const identifier = 'com.synpluse.app'
    return {
      ...config,
      slug: name,
      name: name,
      ios: { ...config.ios, bundleIdentifier: identifier },
      android: { ...config.android, package: identifier },
    }
  } else {
    const name = 'synpluse_dev'
    const identifier = 'com.synpluse.app.dev'
    return {
      ...config,
      slug: name,
      name: name,
      ios: { ...config.ios, bundleIdentifier: identifier },
      android: { ...config.android, package: identifier },
    }
  }
}
