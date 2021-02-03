import { Navigation } from 'react-native-navigation'
import ListPickerScreen from './containers/ListPickerScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ListPickerScreen, store, provider)
}
