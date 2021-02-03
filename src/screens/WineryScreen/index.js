import { Navigation } from 'react-native-navigation'
import WineryScreen from './containers/WineryScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => WineryScreen, store, provider)
}
