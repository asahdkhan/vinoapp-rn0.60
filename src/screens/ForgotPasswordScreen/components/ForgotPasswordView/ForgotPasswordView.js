import React from 'react'
import { View, Text, ImageBackground, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { Navigation } from 'react-native-navigation'
import { SCREEN_IDS, getNavConfiguration } from 'screens'
import Screen from 'hocs/ScreenHoc'
import Button from 'components/Button'
import FormField from 'components/FormField'
import NavStyles from 'theme/NavigatorStyles'
import { validEmail, } from 'services/utils/FormValidator'

import styles from './styles'

const validator = (data) => {
  const { email, } = data

  const emailError = _.without([
    !email ? 'Enter an email address' : '',
    !validEmail(email) ? 'Invalid email address' : '',
  ], '')

  return Object.assign({},
    emailError.length > 0 ? { email: emailError[0], } : {},
  )
}

class ForgotPasswordView extends React.Component {

  _onSubmit = (data) => {
    Keyboard.dismiss()
    this.props.forgotPassword(data.email)
  }

  render() {
    const { loading, errors, handleSubmit, } = this.props

    return (
      <View style={styles.viewContainer}>
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={styles.formContainer}>
              <Text style={styles.formInfoText}>Enter your email address to receive a link to reset your password.</Text>
              <Field
                label="Email"
                name="email"
                component={FormField}
                autoCapitalize='none'
                keyboardType="email-address"
                returnKeyType="done"
                icon="email"
              />

              <View style={{ marginBottom: 20 }} />

              <Button
                rounded
                labelStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 18, color: '#ffffff' }}
                onPress={handleSubmit(this._onSubmit.bind(this))}
                label={loading ? I18n.t('loading') : 'SEND LINK'}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default reduxForm({
  form: 'forgotPassword',
  destroyOnUnmount: true,
  validate: validator,
})(Screen(ForgotPasswordView, {
  title: 'welcome.forgot_password',
  navigatorStyle: NavStyles.subView,
  navigatorButtons: {
    leftButtons: [{
      id: 'backs',
      icon: 'vback',
      type: 'custom',
    }],

    rightButtons: []
  }
}))
