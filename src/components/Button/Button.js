import React from "react";
import classnames from "classnames";
import { TouchableOpacity, Text} from "react-native";

import styles from "./styles";

const Button = ({
  label,
  color,
  onPress,
  disabled,
  style,
  labelStyle,
  buttonImage,
  rounded = false,
  action = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.button,
      rounded && styles.rounded,
      action && styles.action,
      style,
      disabled && { backgroundColor: "#ddd" },
    ]}
  >
    <Text style={[styles.label, labelStyle]}>{label}</Text>
  </TouchableOpacity>
);

export default Button;
