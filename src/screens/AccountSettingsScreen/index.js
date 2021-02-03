import { Navigation } from 'react-native-navigation'
import AccountSettingsScreen from './containers/AccountSettingScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => AccountSettingsScreen, store, provider)
}
