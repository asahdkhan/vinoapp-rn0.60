import { Navigation } from 'react-native-navigation'
import BlogDetailsScreen from './containers/BlogDetailsContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => BlogDetailsScreen, store, provider)
}
