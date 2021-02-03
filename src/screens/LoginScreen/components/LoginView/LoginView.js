import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import _ from 'lodash'
import Snackbar from "react-native-snackbar";
import { reduxForm, Field } from "redux-form";
import I18n from "react-native-i18n";
import { Navigation } from "react-native-navigation";
import { SCREEN_IDS, getNavConfiguration } from "screens";
import Screen from "hocs/ScreenHoc";
import Button from "components/Button";
import FormField from "components/FormField";
import NavStyles from "theme/NavigatorStyles";

import styles from "./styles";

import MAIN_BG from "images/main-bg.png";
import { validEmail, } from 'services/utils/FormValidator'

class LoginView extends React.Component {

  async componentWillReceiveProps(nextProps) {
    if (!this.props.token && nextProps.token) {
      const { icons } = nextProps;
      Navigation.startTabBasedApp(getNavConfiguration(icons));
    }
  }

  _onSubmit = (data) => {
    Keyboard.dismiss();
    this.props.login(data.loginEmail, data.loginPassword);
  };

  render() {
    const { loading, errors, handleSubmit } = this.props;

    return (
      <View style={styles.viewContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, flexDirection: "column" }}
        >
          <ScrollView keyboardShouldPersistTaps={"always"}>
            <View style={styles.formContainer}>
              <Field
                label="Email"
                name="loginEmail"
                component={FormField}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="done"
                icon="email"
              />

              <Field
                name="loginPassword"
                label={I18n.t("login.password")}
                component={FormField}
                autoCapitalize="none"
                secureTextEntry={true}
                icon="lock-outline"
              />

              <View style={{ marginBottom: 50 }} />

              <Button
                rounded
                labelStyle={{
                  fontFamily: "Montserrat-Regular",
                  fontSize: 18,
                  color: "#ffffff",
                }}
                onPress={handleSubmit(this._onSubmit.bind(this))}
                label={loading ? I18n.t("loading") : "LOGIN"}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function validator(data){
  const { loginEmail, loginPassword } = data

  const emailError = _.without([
    !loginEmail ? 'Enter an email address' : '',
    !validEmail(loginEmail) ? 'Invalid email address' : '',
  ], '')

  const passwordError = _.without([
    !loginPassword ? 'Enter a password' : '',
  ], '')

  return Object.assign({},
    emailError.length > 0 ? { loginEmail: emailError[0], } : {},
    passwordError.length > 0 ? { loginPassword: passwordError[0], } : {},
  )
}

export default reduxForm({
  form: "login",
  validate: validator,
  destroyOnUnmount: true,
  touchOnBlur: false
})(
  Screen(LoginView, {
    title: "welcome.login",
    navigatorStyle: NavStyles.subView,
    navigatorButtons: {
      leftButtons: [
        {
          id: "backs",
          icon: "vback",
          type: "custom",
        },
      ],

      rightButtons: [],
    },
  })
);
