import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './styles'

const EMPTY_LIST_ICON = require('images/empty-list.png')

class EmptyListComponent extends React.Component {
  render() {
    return (
      <View style={ styles.viewContainer }>
        <View>
          <Image source={ EMPTY_LIST_ICON } />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={ styles.textMessage }>{ this.props.message }</Text>
        </View>
        <View>
        <TouchableOpacity onPress={ this.props.onPress } >
          <View style={ styles.underneathButton }>
                <Text style={ styles.label }>Let's change that</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

EmptyListComponent.defaultProps = {
  message : 'There are no more wine\naround here!'
}

export default EmptyListComponent;
