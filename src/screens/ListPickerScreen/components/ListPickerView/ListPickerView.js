import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, FlatList, StatusBar, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import Button from 'components/Button'

import styles from './styles'

class ListPickerView extends React.Component {

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content')
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.onSelect(item.value)}
      >
        <Text style={styles.label}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { options, selected, keyExtractor, } = this.props
    return (
      <View>{
        options.length === 0 ?
          <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={ styles.label }>No Results Found</Text>
          </View> :
          <FlatList
            data={options}
            renderItem={this._renderItem}
            keyExtractor={o => o.value}
          />
      }
      </View>
    )
  }
}

export default Screen(ListPickerView, {
  navigatorStyle: NavStyles.modal,
  navigatorButtons: {
    rightButtons: [{
      icon: 'close',
      id: 'close',
      type: 'custom',
    }],
    leftButtons: [],
  },
})
