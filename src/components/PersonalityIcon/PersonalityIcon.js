import React from 'react'

import { View, Image, TouchableOpacity, Text, Platform, Modal, ToastAndroid, } from 'react-native'
import _ from 'lodash'
//import ModalInfo from '../modal-info'
import styles from './styles'
import { PersonalitiesNames } from 'constants/personalities'

const ICONS = {
  'bitter' : require('images/personalities/bitter.png'),
  'classic': require('images/personalities/classic.png'),
  'perfume': require('images/personalities/perfume.png'),
  'rebel'  : require('images/personalities/rebel.png'),
  'sexy'   : require('images/personalities/sexy.jpg'),
  'spicy'  : require('images/personalities/spicy.png'),
  'sweet'  : require('images/personalities/sweet.png'),
  'tannic' : require('images/personalities/tannic.png'),
  'elegant': require('images/personalities/elegant.png'),
  'green'  : require('images/personalities/green.png'),
  'popeye' : require('images/personalities/popeye.png'),
  'silky'  : require('images/personalities/silky.png'),
  'best_value': require('images/personalities/best_value.png'),
  'explosive' : require('images/personalities/explosive.png'),
  'good_value': require('images/personalities/good_value.png'),
  'great_value'  : require('images/personalities/great_value.png'),
  'night_opener' : require('images/personalities/night_opener.png'),
  'old_realiable': require('images/personalities/old_realiable.png'),
}

class PersonalityIconComponent extends React.Component {

  static defaultProps = {
    clickeable: false
  }

  constructor(props) {
    super(props)
    this.state = {
      tooltipOpen : false,
    }
  }

  _showInfo = () => {
    if (Platform.OS === 'ios') {
      this.setState({ tooltipOpen: true })
    } else {
      ToastAndroid.showWithGravity(
        PersonalitiesNames[this.props.name],
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      )
    }
  }

  _closeTooltip = () => {
    this.setState({ 
      tooltipOpen: false, 
    })
  }

  render() {
    const { width, height, name, } = this.props
    
    if (!ICONS[name]) {
      return <View/>
    }

    return (
      <View>
        <TouchableOpacity 
          activeOpacity={1}
          onPressIn ={ this._showInfo }
          onPressOut={ this._closeTooltip }
          style={{ width: width, height: height}}
        >
          <Image 
            source={ ICONS[name] } 
            width={ width } 
            height={ height }
            style={{ 
              width: width, 
              height: height 
            }}  
          />

          { 
            this.state.tooltipOpen ? 
              <View style={ styles.tooltip }>
                <Text style={ styles.tooltipText}>{ PersonalitiesNames[name] }</Text>
              </View> : null
          }
      </TouchableOpacity>
      </View>
    )
  }
}

export default PersonalityIconComponent