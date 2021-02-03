import { Navigation } from 'react-native-navigation'
import LoginScreen from './containers/LoginScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => LoginScreen, store, provider)
}
