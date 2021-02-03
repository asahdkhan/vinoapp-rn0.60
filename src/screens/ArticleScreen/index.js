import { Navigation } from 'react-native-navigation'
import ArticleScreen from './containers/ArticleScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ArticleScreen, store, provider)
}
