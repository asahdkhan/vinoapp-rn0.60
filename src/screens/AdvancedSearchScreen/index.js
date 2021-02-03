import { Navigation } from 'react-native-navigation'
import AdvancedSearchScreen from './containers/AdvancedSearchScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => AdvancedSearchScreen, store, provider)
}
