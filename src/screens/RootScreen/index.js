import { Navigation } from 'react-native-navigation'
import RootScreen from './containers/RootScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => RootScreen, store, provider)
}
