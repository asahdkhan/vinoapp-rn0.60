import I18n from 'react-native-i18n'
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// Add different defaultLocale here (default is 'en'). It will be used as a fallback when device locale isn't found in translations
I18n.defaultLocale = 'es'

// Add translations here
I18n.translations = {
  en: require('./en.json'),
  es: require('./es.json')
}