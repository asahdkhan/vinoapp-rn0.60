import React from "react";
import {
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
  AppState,
  Platform,
} from "react-native";
import I18n from "react-native-i18n";
import { reduxForm, Field } from "redux-form";
import Snackbar from "react-native-snackbar";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Screen from "hocs/ScreenHoc";
import { SCREEN_IDS } from "screens";
import NavStyles from "theme/NavigatorStyles";
import ImagePicker from "react-native-image-crop-picker";
import firebase from '@react-native-firebase/app'
import ModalDropdown from "react-native-modal-dropdown";

import ContactModal from "components/ContactModal";
import LegalModal from "components/LegalModal";
import ReviewModal from "components/ReviewModal";
import CoreModal from "components/CoreModal";
import FAQModal from "components/FAQModal";

import AndroidOpenSettings from "react-native-android-open-settings";

import SettingsField from "../SettingsField";
import validator from "./validator";

import { colors } from "theme";
import styles from "./styles";

class AccountSettingsView extends React.Component {
  constructor(props) {
    super(props);

    this.modalOption = ["Explore", "News", "Search", "Argentina", "Profile"];

    this.state = {
      avatar: props.user ? props.user.photo : "",
      statesStyle: false,
      legalModalOpen: false,
      contactModalOpen: false,
      reviewModalOpen: false,
      coreModalOpen: false,
      faqModalOpen: false,
      coreView: 0,
      appState: AppState.currentState,
    };
    this.changeNtfcPermission();
  }

  componentWillMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.setState(
      {
        appStartsIndex:
          this.props.redirectTo === null ? 0 : this.props.redirectTo,
      },
      () => {
        this.dropDown.select(
          this.props.redirectTo === null ? 0 : this.props.redirectTo
        );
      }
    );
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.changeNtfcPermission();
    }
    this.setState({ appState: nextAppState });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.updatingInfo && !nextProps.updatingInfo) {
      Snackbar.show({
        title: I18n.t("settings.success_update"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (this.props.uploadingAvatar && !nextProps.uploadingAvatar) {
      Snackbar.show({
        title: I18n.t("settings.success_avatar_update"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  _sendMessage = (message) => {
    this.setState({ contactModalOpen: false });
    this.props.sendMessage(message);
  };

  _openLocationPicker(filter) {
    const { user } = this.props;
    if (filter == "location") {
      this.props.navigator.push({
        screen: SCREEN_IDS.GEO_LOCATION_PICKER,
        passProps: {
          filter,
          onLocationSelect: this._onSelectLocation,
        },
      });
    }
    if (
      filter == "states" &&
      (this.state.locationField == "United States" ||
        user.location == "United States")
    ) {
      this.props.navigator.push({
        screen: SCREEN_IDS.GEO_LOCATION_PICKER,
        passProps: {
          filter,
          onLocationSelect: this._onSelectLocation,
        },
      });
    }
  }

  _onSelectLocation = (field, location) => {
    if (field == "location") {
      this.props.change("states", "");
      this.setState({
        locationField: location,
        statesStyle: false,
      });
    }
    if (field == "location" && location == "United States") {
      this.setState({
        statesStyle: true,
      });
    }
    this.props.change(field, location);
    this.props.navigator.pop();
  };

  _openAvatarPicker = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then((image) => {
        this.setState(
          {
            avatar: image.path,
          },
          () => {
            this.props.changeAvatar(image.path);
          }
        );
      })
      .catch((err) => {});
  };

  changeNtfcPermission = () => {
    firebase
      .messaging()
      .hasPermission()
      .then((enable) => {
        if (enable) {
          this.setState({
            ntfcPermission: true,
          });
        } else {
          firebase.messaging().requestPermission();
          this.setState({
            ntfcPermission: false,
          });
        }
      });
  };

  _editProfile = (data) => {
    if (this.state.appStartsIndex !== this.props.redirectTo) {
      this.props.updateTab({ tab: this.state.appStartsIndex });
      if (!this.props.dirtyForm || this.props.updatingInfo) {
        Snackbar.show({
          title: I18n.t("settings.success_update"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
    if (!this.props.dirtyForm || this.props.updatingInfo) {
      return;
    }

    if (data.password === "@@NULL") {
      delete data.password;
    }
    this.props.updateTab({ tab: this.state.appStartsIndex });
    this.props.updateInfo(data);
  };

  _logout = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: SCREEN_IDS.ROOT,
        navigatorStyle: {
          navBarHidden: true,
        },
      },
    });

    this.props.logout();
  };

  render() {
    const {
      user,
      uploadingAvatar,
      lang,
      dirtyForm,
      updatingInfo,
      handleSubmit,
      intialValues,
    } = this.props;
    const {
      avatar,
      contactModalOpen,
      legalModalOpen,
      reviewModalOpen,
      coreModalOpen,
      coreView,
      faqModalOpen,
    } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView style={styles.viewContainer}>
          <View style={styles.avatarContainer}>
            <ImageBackground style={styles.avatar} source={{ uri: avatar }}>
              {uploadingAvatar ? (
                <View style={styles.loadingAvatar}>
                  <ActivityIndicator color="#FFF" />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.changeAvatarBtn}
                  onPress={this._openAvatarPicker}
                >
                  <Icon
                    name="camera"
                    size={22}
                    color={"#FFF"}
                    style={{ opacity: 0.9 }}
                  />
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>
                {I18n.t("settings.presonal_info")}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.saveButton,
                  dirtyForm ? styles.saveButtonActive : {},
                ]}
                onPress={handleSubmit(this._editProfile.bind(this))}
              >
                <Text
                  style={[styles.saveButtonTxt, dirtyForm && { color: "#FFF" }]}
                >
                  {updatingInfo
                    ? I18n.t("settings.saving")
                    : I18n.t("settings.save")}
                </Text>
              </TouchableOpacity>
            </View>

            <Field
              label={I18n.t("settings.name")}
              name="name"
              component={SettingsField}
              icon="user"
            />

            <Field
              label={I18n.t("settings.email")}
              name="email"
              component={SettingsField}
              returnKeyType="done"
              autoCapitalize="none"
              keyboardType="email-address"
              icon="envelope"
            />

            <Field
              name="password"
              label={I18n.t("settings.password")}
              component={SettingsField}
              autoCapitalize="none"
              secureTextEntry={true}
              icon="lock"
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this._openLocationPicker("location")}
            >
              <Field
                label={I18n.t("login.location")}
                name="location"
                component={SettingsField}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="done"
                icon="map-marker"
                editable={false}
              />
            </TouchableOpacity>

            {this.state.statesStyle && (
              <TouchableOpacity
                onPress={() => this._openLocationPicker("states")}
                activeOpacity={1}
              >
                <Field
                  label={I18n.t("login.states")}
                  name="states"
                  component={SettingsField}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="done"
                  icon="map-marker"
                  editable={false}
                />
              </TouchableOpacity>
            )}

            {/* <View style={styles.langPickerContaienr}>
              <Icon name="language" size={22} style={styles.settingsActionIcon} />
              <Text style={styles.label}>{I18n.t('settings.language')}</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.lang}>ES</Text>
                <Switch
                  onTintColor={colors.primaryColor}
                  style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                  onValueChange={(value) => {
                    let newLang = value ? 'en' : 'es';
                    this.props.changeLang(newLang)
                  }}
                  value={lang === 'en'}
                />
                <Text style={styles.lang}>EN</Text>
              </View>
            </View>
 */}
            <Field
              label={I18n.t("settings.info")}
              name="info"
              component={SettingsField}
              returnKeyType="done"
              multiline={true}
              icon="id-card"
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{I18n.t("settings.settings")}</Text>
            </View>

            <View style={styles.settingsActionButton}>
              <Icon name="home" size={22} style={styles.settingsActionIcon} />
              <Text style={styles.settingsActionText}>
                {I18n.t("settings.app_starts")}
              </Text>
              <ModalDropdown
                ref={(ref) => (this.dropDown = ref)}
                defaultValue={""}
                style={{ width: 150, position: "absolute", right: 0 }}
                textStyle={{
                  fontSize: 15,
                  textAlign: "center",
                  fontFamily: "Raleway-SemiBold",
                  color: "#34404c",
                }}
                dropdownStyle={{ width: 150 }}
                dropdownTextStyle={{
                  fontSize: 15,
                  fontFamily: "Raleway-Regular",
                  color: "#34404c",
                }}
                dropdownTextHighlightStyle={{ color: colors.primaryColor }}
                adjustFrame={(style) => {
                  style.top += 40;
                  return style;
                }}
                options={this.modalOption}
                onSelect={(idx, value) => {
                  this.setState({
                    appStartsIndex: idx,
                  });
                }}
              ></ModalDropdown>
              <Icon
                name="angle-down"
                size={22}
                style={[
                  styles.settingsActionIcon,
                  { position: "absolute", right: 10 },
                ]}
              />
            </View>

            <View style={styles.ntfcPickerContainer}>
              <Icon name="bell" size={22} style={styles.settingsActionIcon} />
              <Text style={styles.label}>
                {I18n.t("settings.notifications")}
              </Text>
              <View style={styles.switchContainer}>
                <Text style={styles.lang}>Off</Text>
                <Switch
                  thumbTintColor={Platform.OS !== "ios" && "#F5F5F5"}
                  onTintColor={colors.primaryColor}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  onValueChange={() => {
                    Platform.OS === "ios"
                      ? Linking.openURL("app-settings:")
                      : AndroidOpenSettings.appNotificationSettings();
                    this.changeNtfcPermission();
                  }}
                  value={this.state.ntfcPermission}
                />
                <Text style={styles.lang}>On</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={1} // default is .2
                onPress={async () => {
                  this.setState({ coreView: coreView + 1 });
                  if (coreView > 8) {
                    await Snackbar.show({
                      title: I18n.t("settings.success_core"),
                      duration: Snackbar.LENGTH_LONG,
                    });
                    this.setState({ coreModalOpen: true, coreView: 0 });
                  }
                }}
              >
                <Text style={styles.title}>
                  {I18n.t("settings.feedback_support")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsActionButton}
              onPress={() => this.setState({ faqModalOpen: true })}
            >
              <Icon
                name="life-bouy"
                size={22}
                style={styles.settingsActionIcon}
              />
              <Text style={styles.settingsActionText}>
                {I18n.t("settings.faq_help")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsActionButton}
              onPress={() => this.setState({ contactModalOpen: true })}
            >
              <Icon
                name="address-book"
                size={22}
                style={styles.settingsActionIcon}
              />
              <Text style={styles.settingsActionText}>
                {I18n.t("settings.contact_us")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsActionButton}
              onPress={() => this.setState({ reviewModalOpen: true })}
            >
              <Icon
                name="thumbs-up"
                size={22}
                style={styles.settingsActionIcon}
              />
              <Text style={styles.settingsActionText}>
                {I18n.t("settings.leave_review")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsActionButton}
              onPress={() => this.setState({ legalModalOpen: true })}
            >
              <Icon
                name="info-circle"
                size={22}
                style={styles.settingsActionIcon}
              />
              <Text style={styles.settingsActionText}>
                {I18n.t("settings.about_terms_and_conditions")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsLogOutButton}
              onPress={this._logout}
            >
              <Text style={[styles.settingsActionText, { fontSize: 18 }]}>
                {I18n.t("settings.log_out")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ContactModal
          open={contactModalOpen}
          onSubmit={this._sendMessage}
          onClose={() => this.setState({ contactModalOpen: false })}
        />

        <LegalModal
          title={I18n.t("login.terms_and_conditions")}
          open={legalModalOpen}
          onClose={() => this.setState({ legalModalOpen: false })}
        />

        <ReviewModal
          title={I18n.t("settings.leave_review")}
          open={reviewModalOpen}
          onClose={() => this.setState({ reviewModalOpen: false })}
        />

        <CoreModal
          open={coreModalOpen}
          onClose={() => this.setState({ coreModalOpen: false })}
        />

        <FAQModal
          title={I18n.t("settings.faq_help")}
          open={faqModalOpen}
          onClose={() => this.setState({ faqModalOpen: false })}
        />
      </KeyboardAvoidingView>
    );
  }
}

const AccountSettingsScreen = Screen(AccountSettingsView, {
  title: "settings.settings",
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
    screenBackgroundColor: "#F5F5F5",
  },
  navigatorButtons: {
    leftButtons: [
      {
        icon: "vback",
        type: "custom",
        id: "backs",
      },
    ],
    rightButtons: [],
  },
});

export default reduxForm({ form: "profile" })(AccountSettingsScreen);
