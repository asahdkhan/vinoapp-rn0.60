import { Navigation } from 'react-native-navigation'
import WineMakerScreen from './containers/WineMakerScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => WineMakerScreen, store, provider)
}
