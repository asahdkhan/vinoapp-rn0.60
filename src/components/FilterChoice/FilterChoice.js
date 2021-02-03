import React from 'react'
import { View, TouchableOpacity, Text, } from 'react-native'
import _ from 'lodash'

import styles from './styles'

class FilterChoice extends React.Component {
  render() {
    const { choices } = this.props
    let buttonLeft  = [ styles.button, styles.buttonLeft ];
    let buttonRight = [ styles.button, styles.buttonRight ];
    let buttonCenter= [ styles.button, styles.buttonCenter ];
    let labelLeft  = [styles.label];
    let labelRight = [styles.label];
    let labelCenter= [styles.label];

    if (this.props.active == 0) {
      buttonLeft.push(styles.buttonActive);
      labelLeft.push(styles.labelActive);
    } else if (this.props.active == 1) {
      buttonRight.push(styles.buttonActive);
      labelRight.push(styles.labelActive);
    } else {
      buttonCenter.push(styles.buttonActive)
      labelCenter.push(styles.labelActive);
    }


    return (
      <View style={[ styles.viewContainer, this.props.style ? this.props.style : {} ]}>
        <TouchableOpacity style={ buttonLeft } onPress={ () => { this.props.onChange(0, choices[0]) }}>
          <Text style={ labelLeft }>{ _.upperCase(this.props.choices[0])}</Text>
        </TouchableOpacity>    
        
        {
          this.props.showNone &&
          <TouchableOpacity style={ buttonCenter } onPress={ () => { this.props.onChange(-1, null) }}>
            <Text style={ labelCenter }>{ _.upperCase(this.props.noneChoice)}</Text>
          </TouchableOpacity>    
        }

        <TouchableOpacity style={ buttonRight } onPress={ () => { this.props.onChange(1, choices[1]) }}>
          <Text style={ labelRight }>{ _.upperCase(this.props.choices[1])}</Text>
        </TouchableOpacity>          
      </View>
    );
  }
}

export default FilterChoice
