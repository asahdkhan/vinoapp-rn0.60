import React from 'react'
import { View, Image, ImageBackground } from 'react-native'

import styles from './styles'

const WHEEL_BG = require('images/intensity-wheel/intensity_bg.png')

const LEVELS = {
  aroma : [
    null,
    require('images/intensity-wheel/aroma-1.png'),
    require('images/intensity-wheel/aroma-2.png'),
    require('images/intensity-wheel/aroma-3.png'),
    require('images/intensity-wheel/aroma-4.png'),
    require('images/intensity-wheel/aroma-5.png'),
  ],
  acidity : [
    null,
    require('images/intensity-wheel/acidity-1.png'),
    require('images/intensity-wheel/acidity-2.png'),
    require('images/intensity-wheel/acidity-3.png'),
    require('images/intensity-wheel/acidity-4.png'),
    require('images/intensity-wheel/acidity-5.png'),
  ],
  wood : [
    null,
    require('images/intensity-wheel/wood-1.png'),
    require('images/intensity-wheel/wood-2.png'),
    require('images/intensity-wheel/wood-3.png'),
    require('images/intensity-wheel/wood-4.png'),
    require('images/intensity-wheel/wood-5.png'),
  ],
  fruit : [
    null,
    require('images/intensity-wheel/fruit-1.png'),
    require('images/intensity-wheel/fruit-2.png'),
    require('images/intensity-wheel/fruit-3.png'),
    require('images/intensity-wheel/fruit-4.png'),
    require('images/intensity-wheel/fruit-5.png'),
  ],
  spice : [
    null,
    require('images/intensity-wheel/spice-1.png'),
    require('images/intensity-wheel/spice-2.png'),
    require('images/intensity-wheel/spice-3.png'),
    require('images/intensity-wheel/spice-4.png'),
    require('images/intensity-wheel/spice-5.png'),
  ]
}

class IntensityWheel extends React.Component {

  _buildValues() {
    let images = []
    for(let value in this.props.values) {
      images.push(
        <Image 
          key={ value }
          source={ LEVELS[value][this.props.values[value]] }
          width={ this.props.width } 
          height={ this.props.height } 
          style={[ styles.value , { width: this.props.width, height: this.props.height }]} />
      )
    }

    return images
  }

  render() {
    return (
      <View>
        <ImageBackground 
          source={ WHEEL_BG } 
          width={ this.props.width } 
          height={ this.props.height } 
          style={[ styles.wheel , { width: this.props.width, height: this.props.height }]}>
          { this._buildValues() }
        </ImageBackground>
      </View>
    )
  }
}

export default IntensityWheel
