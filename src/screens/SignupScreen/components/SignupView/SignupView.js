import React from 'react'
import { View, Text, ImageBackground, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, StatusBar } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_IDS, getNavConfiguration } from 'screens'
import Screen from 'hocs/ScreenHoc'
import Button from 'components/Button'
import FormField from 'components/FormField'
import NavStyles from 'theme/NavigatorStyles'
import validator from './validator'
import LegalModal from 'components/LegalModal'

import styles from './styles'

class SignupView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      legal: false,
      modalOpen: false,
      statesStyle: false
    }


    this.props.navigator.setTitle({
      title: I18n.t('menu.sign_up')
    })
  }

  componentWillReceiveProps(nextProps) {
    StatusBar.setBarStyle('dark-content')
    if (!this.props.token && nextProps.token) {
      const { icons, } = nextProps
      Navigation.startTabBasedApp(getNavConfiguration(icons))
    }
  }

  _onSubmit = (data) => {
    Keyboard.dismiss()

    if (!this.state.legal) {
      this.props.dispatch({
        type: 'LEGAL_ERROR',
        payload: {
          message: 'Please accept the terms and conditions',
        }
      })
    } else {
      this.props.signup(data)
    }
  }

  _openLocationPicker(filter) {
    if (filter == "location") {
      this.props.navigator.push({
        screen: SCREEN_IDS.GEO_LOCATION_PICKER,
        passProps: {
          filter,
          onLocationSelect: this._onSelectLocation
        }
      })
    } if (filter == "states" && this.state.locationField == 'United States') {
      this.props.navigator.push({
        screen: SCREEN_IDS.GEO_LOCATION_PICKER,
        passProps: {
          filter,
          onLocationSelect: this._onSelectLocation
        }
      })
    }
  }

  _onSelectLocation = (field, location) => {
    if (field == "location") {
      this.props.change('states', '')
      this.setState({
        locationField: location,
        statesStyle: false
      });
    }
    if (field == "location" && location == "United States") {
      this.setState({
        statesStyle: true
      })
    }
    this.props.change(field, location)
    this.props.navigator.pop()
  }

  render() {
    const { legal, modalOpen, } = this.state
    const { loading, errors, handleSubmit, } = this.props
    return (
      <View style={styles.viewContainer}>
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={styles.formContainer}>
              <Field
                label={I18n.t('login.first_name')}
                name="name"
                component={FormField}
                returnKeyType="done"
                icon="account-box"
              />

              <Field
                label={I18n.t('login.last_name')}
                name="lastname"
                component={FormField}
                returnKeyType="done"
                icon="account-box"
              />

              <Field
                label="Email"
                name="email"
                component={FormField}
                autoCapitalize='none'
                keyboardType="email-address"
                returnKeyType="done"
                icon="email"
              />

              <TouchableOpacity
                onPress={() => this._openLocationPicker('location')}
                activeOpacity={1}
              >
                <Field
                  label={I18n.t('login.country')}
                  name="location"
                  component={FormField}
                  autoCapitalize='none'
                  keyboardType="email-address"
                  returnKeyType="done"
                  icon="map-marker"
                  editable={false}
                />
              </TouchableOpacity>

              {
                this.state.statesStyle &&
                <TouchableOpacity
                  onPress={() => this._openLocationPicker('states')}
                  activeOpacity={1}
                >
                  <Field
                    label={I18n.t('login.states')}
                    name="states"
                    statesStyle={this.state.statesStyle}
                    component={FormField}
                    autoCapitalize='none'
                    keyboardType="email-address"
                    returnKeyType="done"
                    icon="map-marker"
                    editable={false}
                  />
                </TouchableOpacity>
              }

              <Field
                name="password"
                label={I18n.t('login.password')}
                component={FormField}
                autoCapitalize='none'
                secureTextEntry={true}
                icon="lock-outline"
              />

              <View style={{ marginBottom: 50 }} />

              <Button
                rounded
                labelStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 18, color: '#ffffff' }}
                onPress={handleSubmit(this._onSubmit.bind(this))}
                label={loading ? I18n.t('loading') : I18n.t('login.register')}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 10, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => { this.setState({ legal: !this.state.legal }) }}>
                  {legal
                    ? <Icon name='checkbox-marked' color='#666666' size={22} style={{ marginRight: 0, paddingRight: 5 }} />
                    : <Icon name='checkbox-blank-outline' color='#666666' size={22} style={{ marginRight: 0, paddingRight: 5 }} />
                  }
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 26, paddingTop: 2, }}>
                  <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Regular', color: '#666666' }}>{I18n.t('login.i_accept')}</Text>
                  <TouchableOpacity onPress={() => { this.setState({ modalOpen: true }) }}>
                    <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Regular', color: '#666666', textDecorationLine: 'underline', }}>terms and conditions</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <LegalModal title={I18n.t('login.terms_and_conditions')} open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} />
      </View>
    )
  }
}

const SignupViewScreen = Screen(SignupView, {
  navigatorStyle: {
    ...NavStyles.subView,
  },
  navigatorButtons: {
    leftButtons: [{
      icon: 'vback',
      type: 'custom',
      id: 'backs',
    }],

    rightButtons: []
  }
})

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: true,
  validate: validator,
  touchOnBlur: false,
})(SignupViewScreen)
