import { Navigation } from 'react-native-navigation'
import FeedScreen from './containers/FeedScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => FeedScreen, store, provider)
}
