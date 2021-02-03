import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

const ICONS = {
  EMPTY : 'md-star',
  HALF  : 'md-star-half',
  FULL  : 'md-star'
}

class RaitingBar extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    raiting: PropTypes.number,
    active : PropTypes.bool,
    small : PropTypes.bool
  };

  static defaultProps = {
    size: 18,
    active: false,
    small: false
  };
  
  render() {
    const { active, size, small, raiting, onSetRate, } = this.props
    let iconStyle = small ? styles.small : styles.icon
    let icons = [];
    if (!active) {
      for (var i=0; i < 5; i++) {
        let scoreValue = i + 1;
        // x.1 , x.2, x.3 => x
        // x.4 , x.5, x.6 => x.5
        // x.7 , x.8, x.9 => x + 1
        
        if (scoreValue <= raiting) {
          icons.push(
            <Icon key={ 'star-'+ i } name={ ICONS.FULL } size={ size } style={[ iconStyle, styles.activeIcon ]} />
          )
        } else {
          let extra = Math.round((scoreValue - raiting) * 10 ) / 10;
          // 3.6
          // 4 - 3.6 = 0.4
          // 5 - 3.6 = 1.5
          if (extra >= 0.1 && extra <= 0.3) {
            icons.push(
              <Icon key={ 'star-'+ i } name={ ICONS.FULL } size={ size } style={[ iconStyle, styles.activeIcon ]} />
            )
          }

          if (extra >= 0.4 && extra <= 0.6) {
            icons.push(
              <Icon key={ 'star-'+ i } name={ ICONS.HALF } size={ size } style={[ iconStyle, styles.activeIcon ]} />
            )
          } 

          if (extra >= 0.7) {
            icons.push(
              <Icon key={ 'star-'+ i } name={ ICONS.EMPTY } size={ size } style={[ iconStyle ]} />
            )
          } 
          
        }
        
      }
    } else {
      for (var i=0; i < 5; i++) {
        let scoreValue = i + 1;
        // x.1 , x.2, x.3 => x
        // x.4 , x.5, x.6 => x.5
        // x.7 , x.8, x.9 => x + 1
        
        if (scoreValue <= raiting) {
          icons.push(
            <TouchableOpacity key={ 'star-'+ i } onPress={() => { onSetRate(scoreValue) }}>
              <Icon name={ ICONS.FULL } size={ size } style={[ iconStyle, styles.activeIcon ]} />
            </TouchableOpacity>
          )
        } else {
          let extra = Math.round((scoreValue - raiting) * 10 ) / 10;
          // 3.6
          // 4 - 3.6 = 0.4
          // 5 - 3.6 = 1.5
          if (extra >= 0.1 && extra <= 0.3) {
            icons.push(
              <TouchableOpacity key={ 'star-'+ i } onPress={() => { onSetRate(scoreValue) }}>
                <Icon name={ ICONS.FULL } size={ size } style={[ iconStyle, styles.activeIcon ]} />
              </TouchableOpacity>
            )
          }

          if (extra >= 0.4 && extra <= 0.6) {
            icons.push(
              <TouchableOpacity key={ 'star-'+ i } onPress={() => { onSetRate(scoreValue) }}>
                <Icon name={ ICONS.HALF } size={ size } style={[ iconStyle, styles.activeIcon ]} />
              </TouchableOpacity>
            )
          } 

          if (extra >= 0.7) {
            icons.push(
              <TouchableOpacity key={ 'star-'+ i } onPress={() => { onSetRate(scoreValue) }}>
                <Icon name={ ICONS.EMPTY } size={ size } style={[ iconStyle ]} />
              </TouchableOpacity>
            )
          } 
          
        }
        
      }
    }

    return(
      <View style={ styles.container }>
        { icons }
      </View>
    )
  }
}

export default RaitingBar
