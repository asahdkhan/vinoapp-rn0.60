import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import I18n from 'react-native-i18n'

const {height, width} = Dimensions.get('window')

import styles from './styles'

class LocationBox extends React.Component {

  static propsTypes = {
    image: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    touchable: PropTypes.bool
  }

  static defaultProps = {
    touchable : true
  }

  render() {
    const { label, count, titleStyle, subTitleStyle, onPress, style, image, touchable, } = this.props

    return(
      <ImageBackground source={ image } style={[ styles.viewContainer , style ]}>
        {
          touchable ?
            <TouchableOpacity style={ styles.overlay } activeOpacity={0.6} onPress={ onPress } >
              <Text style={[ styles.labels, styles.locationName, titleStyle ]}>{ label }</Text>
              <Text style={[ styles.labels, styles.locationWines, subTitleStyle ]}>({ count ? count : 0 } { I18n.t('menu.wines')})</Text>
            </TouchableOpacity> :

            <View style={ styles.overlay } >
              <Text style={[ styles.labels, styles.locationName, titleStyle ]}>{ label }</Text>
              <Text style={[ styles.labels, styles.locationWines, subTitleStyle ]}>({ count ? count : 0 } { I18n.t('menu.wines')})</Text>
            </View>
        }
      </ImageBackground>
    )
  }
}

export default LocationBox
