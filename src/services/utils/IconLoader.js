import Icon from 'components/Icon'
import Ionicons from 'react-native-vector-icons/Ionicons'

/**
 * Load icons as image resources.
 */
export default (icons) => {
  return Promise.all(
    icons.map(icon => {
      if (icon.family === 'vinoapp' || !icon.family) {
        return Icon.getImageSource(icon.name, icon.size)
      }

      if (icon.family === 'Ionicons') {
        return Ionicons.getImageSource(icon.name, icon.size)
      }
    })
  )
}
