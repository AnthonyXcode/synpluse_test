import i18n from 'i18n-js'
export let currentLocale = ''

export const changeLocale = (locale: string) => {
  currentLocale = locale
  i18n.locale = locale
}

export const t = (key: string) => {
  return i18n.t(key)
}

export const defaultTranslation = () => {
  const translation = require('./translationDefault.json')
  return {
    en: translation.en,
    zh: translation.zh,
    zh_CN: translation.zh_CN,
  }
}
