import { Navigation } from 'react-native-navigation'
import VintageScreen from './containers/VintageScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => VintageScreen, store, provider)
}
