import { Navigation } from 'react-native-navigation'
import SpecialSearchScreen from './containers/SpecialSearchScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => SpecialSearchScreen, store, provider)
}
