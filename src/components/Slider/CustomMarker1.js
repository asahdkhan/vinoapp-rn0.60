import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';

import { colors } from 'theme'

class CustomMarker1 extends React.Component {

  render() {
    return (
      <View style={ styles.markerContainer }>
        {/* this.props.pressed && Platform.OS === 'ios' ? 
          <Text style={ styles.value }>{ this.props.currentValue } { this.props.minLabel }</Text> : null
       */}
          <View style={[styles.marker, this.props.pressed ? styles.markerActive : {} ]} />
        <Text style={ styles.label }>{ this.props.currentValue }</Text> 

        {/* !this.props.hideLabel && !this.props.pressed ? 
          <Text style={ styles.label }>{ this.props.currentValue } { this.props.label }</Text> : null
        */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    width: 50,
    height: 50,
  //  backgroundColor: 'blue',
  },

  marker: {  
    height:25,
    minWidth: 48,
    width: 48,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primaryColor,
    justifyContent: 'center',
   // alignItems: 'center',    
  },

  markerActive: {
    height:25,
    minWidth: 48,
    width: 48,
  },

  value: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    // height: 20,
    fontSize: 11,
    fontFamily: 'Raleway-Regular',
    color: '#FFF',
    borderRadius: 0,
    padding: 3,
    position: 'absolute',
    textAlign: 'center',
    marginTop: 5,
    left: 0,
    right: 0,
    top: 30,
  },

  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 11,
    color: '#34404c', 
    position: 'absolute',
    width: 50,
    left: 0,
    top: 18,
    //top: 35,
    textAlign: 'center',
  }
});


CustomMarker1.defaultProps = {
}

export default CustomMarker1;