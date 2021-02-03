import { Navigation } from 'react-native-navigation'
import SignupScreen from './containers/SignupScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => SignupScreen, store, provider)
}
