import React, { Component } from 'react'
import PropTypes from "prop-types"
import Screen from 'hocs/ScreenHoc'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Dimensions, StatusBar, KeyboardAvoidingView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SCREEN_IDS } from 'screens'
import Icon from 'react-native-vector-icons/Ionicons'
import NavStyles from 'theme/NavigatorStyles'
import styles from './styles'
import { utils } from 'theme'
import _ from 'lodash';
import States from './States';
import Countries from './Countries';
const { width } = Dimensions.get('window')

/**
 * Location Select View
 * @prop onLocationSelect: Function, when location is selected on press
 */

class GeoLocationPickerView extends Component {

  static propTypes = {
    onLocationSelect: PropTypes.func,
    filter: PropTypes.string
  }

  constructor(props) {
    super(props);
    var filter = props.filter == "location" ? Countries : States
    this.state = {
      input: '',
      results: [],
      filter
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content');
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content')
  }

  _onSearchChange = (value) => {
    var search = _.toLower(value);
    var results = search !== '' ?
      _.filter(this.state.filter, function (item) {
        return _.toLower(item.country_states).indexOf(search) > -1;
      }) : []
    this.setState({
      input: value,
      results
    })
  }

  _resultsList = () => {
    return this.state.results.map((v, i) => {
      return <TouchableOpacity onPress={() => this._selectedLocation(v)} style={styles.locationItemContainer}>
        <View style={styles.locationItemIcon}>
          <Icon
            name='ios-pin'
            size={16}
            color='#FFF'
          />
        </View>
        <View>
          <Text style={styles.locationTextMain}>
            {v.country_states}
          </Text>
        </View>
      </TouchableOpacity>
    })
  }

  _selectedLocation = (data) => {
    this.setState({
      input: data.country_states
    })
    this.props.onLocationSelect(this.props.filter, data.country_states)
  }

  render() {
    const { input, results } = this.state
    const {  filter } = this.props
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, }}>
         <View style={styles.googleAutoComplete.textInputContainer}>
              <TextInput
                value={this.state.input}
                style={[
                  styles.googleAutoComplete.textInput,
                  { fontSize: input.length > 0 ? 16 / utils.fontScale : 13 / utils.fontScale },
                ]}
                onChangeText={this._onSearchChange}
                // onKeyPress={this._onKeyPress}
                placeholder={filter == "location" ? 'Enter Country': 'Enter State'}
                placeholderTextColor={'#34404c'}
                autoCapitalize={'none'}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                //onSubmitEditing={this._search}
                returnKeyType="done"
                blurOnSubmit={true} />
              <Icon
                style={styles.inputIcon}
                name='ios-close-circle'
                size={20}
                color={'#CCC'}
                onPress={() => this.setState({ input: '', results: [] })}
              />
            </View>
        <ScrollView style={{ flex: 1, }}>
          <View style={styles.container}>
          {results.length > 1 && <Text style={[styles.locationTitle, { width }]}>Locations</Text>}
            {this._resultsList()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default Screen(GeoLocationPickerView, {
  title: 'login.location',
  navigatorStyle: {
    ...NavStyles.subView,
  },
  navigatorButtons: {
    leftButtons: [{
      id: 'backs',
      icon: 'vback',
      type: 'custom',
    }],
  },
})
