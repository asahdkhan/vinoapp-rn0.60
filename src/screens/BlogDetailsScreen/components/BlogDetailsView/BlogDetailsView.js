import React from "react";
import Config from "react-native-config";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import I18n from "react-native-i18n";
import Spinner from "react-native-spinkit";
import Screen from "hocs/ScreenHoc";
import { SCREEN_IDS } from "screens";
import NavStyles from "theme/NavigatorStyles";
import { colors } from "theme";
import { WebView } from "react-native";
import _ from "lodash";
import {
  baseStyle,
  layout,
  responsive,
  styleWebView,
} from "./blogDetailsStyle";

import styles from "./styles";
//const webapp = require('responsive.css');
//import responsive from 'responsive.css'

class BlogDetailsView extends React.Component {
  constructor(props) {
    super();
    this.state = { webviewLoaded: false };
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "position", android: "position" })}
        enabled
        contentContainerStyle={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 30, android: 20 })}
        style={{ flexGrow: 1 }}
      >
        <WebView
          ref={(ref) => (this.WEBVIEW_REF = ref)}
          onLoad={() => this.setState({ webViewLoaded: true })}
          onLoadStart={() => this.setState({ webViewLoaded: false })}
          source={{ uri: Config.BLOG_WEBVIEW + this.props.id }}
          renderLoading={() => (
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                isVisible={true}
                size={30}
                type={"Bounce"}
                color={colors.primaryColor}
              />
              <Text
                style={{ marginTop: 10, textAlign: "center", color: "#777" }}
              >
                {I18n.t("loading")}
              </Text>
            </View>
          )}
          startInLoadingState
          //source={{ uri: 'https://stagweb.vinoapp.co/blog-details/' + this.props.id }}
          injectedJavaScript={
            'function removeTopPadding() {var mainClass = document.getElementsByClassName("main-content"), i;for (i = 0; i < mainClass.length; i += 1) {mainClass[i].style.marginTop = 0;};}; removeTopPadding();'
          }
        />
      </KeyboardAvoidingView>
    );
  }
}

export default Screen(BlogDetailsView, {
  //title: 'expert.expert',
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
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
