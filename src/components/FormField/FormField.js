import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import { colors } from "theme";

class FormField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      secureTextEntry: true,
      submit: false,
    };
    if (Text.defaultProps == null) Text.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  _onChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const {
      statesStyle,
      label,
      value,
      type,
      input,
      style,
      meta: { touched, error, asyncValidating },
      icon,
      autoCapitalize,
      secureTextEntry,
      keyboardType,
      editable,
    } = this.props;
    const errorStyle = error && touched ? styles.error : {};
    return (
      <View>
        <View style={[styles.viewContainer, style ? style : {}]}>
          <TextInput
            value={
              input.name === "location" || input.name === "states"
                ? input.value
                : this.state.value
            }
            onChange={input.onChange}
            onChangeText={this._onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            style={[
              styles.input,
              input.name == "states" &&
                !statesStyle && { backgroundColor: "#eee" },
              errorStyle,
            ]}
            placeholder={error && touched ? error : label}
            placeholderTextColor={
              error && touched ? colors.primaryColor : "#666666"
            }
            underlineColorAndroid={"rgba(0,0,0,0)"}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType || "default"}
            secureTextEntry={secureTextEntry && this.state.secureTextEntry}
            editable={editable}
            pointerEvents={!editable ? "none" : "auto"}
            returnKeyType="done"
          />

          {(input.name == "loginPassword" || input.name == "password") && (
            <TouchableOpacity
              style={{ position: "absolute", right: 18, top: 12 }}
              onPress={() =>
                this.setState({ secureTextEntry: !this.state.secureTextEntry })
              }
            >
              {this.state.secureTextEntry ? (
                <Icon name="eye-off" size={24} color={'#777777'} />
              ) : (
                <Icon name="eye" size={24} color={'#777777'}/>
              )}
            </TouchableOpacity>
          )}

          {icon && (
            <Icon
              name={icon}
              size={24}
              color={colors.primaryColor}
              style={styles.icon}
            />
          )}

          {input.name == "location" && (
            <Icon
              name="chevron-down"
              size={24}
              color={colors.primaryColor}
              style={{ position: "absolute", right: 18, top: 12 }}
            />
          )}
          {input.name == "states" && (
            <Icon
              name="chevron-down"
              size={24}
              color={colors.primaryColor}
              style={{ position: "absolute", right: 18, top: 12 }}
            />
          )}

          {!error &&
            input.name != "loginPassword" &&
            input.name != "password" &&
            input.name != "location" &&
            input.name != "states" &&
            input.name != "loginEmail" && (
              <Icon
                name="check-circle"
                size={24}
                color={colors.primaryColor}
                style={{ position: "absolute", right: 18, top: 12 }}
              />
            )}
          {error === "Invalid email address" && touched ? (
            <Text style={styles.inValidEmail}>{error}</Text>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

FormField.defaultProps = {
  editable: true,
};

export default FormField;
