import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';

import { colors } from 'theme'

class CustomMarker extends React.Component {

  render() {
    return (
      <View style={ styles.markerContainer }>
        {/* this.props.pressed && Platform.OS === 'ios' ? 
          <Text style={ styles.value }>{ this.props.currentValue } { this.props.label }</Text> : null
    */}
  
        <View style={[styles.marker, this.props.pressed ? styles.markerActive : {} ]} />

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
    width: 48,
    height: 48,
  },

  marker: { 
    height:30,
    minWidth: 30,
    width: 30,
    borderRadius: 25,
    backgroundColor: colors.primaryColor,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',    
  },

  markerActive: {
    height:30,
    minWidth: 30,
    width: 30,
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
    top: 35,
  },

  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 11,
    color: '#34404c', 
    position: 'absolute',
    width: 50,
    left: 0,
    //top: 20
    top: 35,
    textAlign: 'center',
  }
});


CustomMarker.defaultProps = {
}

export default CustomMarker;