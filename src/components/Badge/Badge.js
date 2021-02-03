import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native'

class BadgeComponent extends Component {
  render() {
    return (
      <View style={ styles.badgeContainer } />
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    width: 22,
    height: 22,
    backgroundColor: '#CCC',
    marginRight: 20
  }
})


export default BadgeComponent
