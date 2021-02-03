import { Navigation, } from 'react-native-navigation'
import WineryAccessScreen from './containers/WineryAccessContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => WineryAccessScreen, store, provider)
}
