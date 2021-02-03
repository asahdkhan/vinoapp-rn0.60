import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StatusBar, } from 'react-native'
import Screen from 'hocs/ScreenHoc'
import I18n from 'react-native-i18n'
import NavStyles from 'theme/NavigatorStyles'
import { colors, } from 'theme'
import Icon from 'react-native-vector-icons/Ionicons'

class PairingsFilterView extends React.Component {
  state = {  }

  constructor(props) {
    super(props)
    props.navigator.setTitle({
      title: props.type === 'typeofFoods' ? I18n.t('pairings.type_of_food'): I18n.t('pairings.main_ingredient'),
    })
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content')
  }

  _onSelectItem = (item) => {
    this.props.onSelect(this.props.type, item)
    this.props.navigator.dismissModal()
  }

  _rednerItem = ({ item, }) => (
    <TouchableOpacity style={{ paddingHorizontal: 16, height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CFCFCF', justifyContent: 'space-between' }} onPress={() => { this._onSelectItem(item) }}>
      <Text style={{ fontSize: 16, color: '#000', fontFamily: 'GothamRounded-Book', }}>{ item.name }</Text>
      { 
        this.props.selected.value === item.value &&
          <Icon name="ios-checkmark" size={50} color={ colors.primaryColor } />
      }
    </TouchableOpacity>
  )

  render() {
    const { list, } = this.props
    return (
      <FlatList
        data={ list }
        renderItem={ this._rednerItem }
        keyExtractor={o => o.value}
      />
    )
  }
}

export default Screen(PairingsFilterView, {
  navigatorStyle: NavStyles.modal,
  navigatorButtons: {
    leftButtons: [],
    rightButtons: [{
      id: 'close',
      icon: 'close',
      type: 'custom',
    }]
  }
})
