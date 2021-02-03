import { Navigation } from 'react-native-navigation'
import BlogScreen from './containers/BlogScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => BlogScreen, store, provider)
}
