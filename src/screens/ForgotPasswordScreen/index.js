import { Navigation } from 'react-native-navigation'
import ForgotPasswordScreen from './containers/ForgotPasswordContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ForgotPasswordScreen, store, provider)
}
