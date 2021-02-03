import { Navigation } from 'react-native-navigation'
import ZonesScreen from './containers/ZonesScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ZonesScreen, store, provider)
}
