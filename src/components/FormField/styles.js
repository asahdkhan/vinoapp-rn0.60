/**
 * Styles for FormField
 */
import { Dimensions } from "react-native";
import { colors, utils } from 'theme'

export default {
  viewContainer: {
    marginBottom: 15
  },

  input: {
    height: 50,
    borderRadius: 25,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#FFF',
    color: '#666666',
    fontSize: 14 / utils.fontScale,
    fontFamily: 'Helvetica',
    borderWidth: 1,
    borderColor: '#f6f6f6'
  },

  error: {
    borderWidth: 1,
    borderColor: colors.primaryColor,
    backgroundColor: '#FFFFFF',
    color: colors.primaryColor
    // position: 'absolute',
    // right: 0,
    // bottom: -5,
  },

  errorText: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: colors.primaryColor,
  },

  icon: {
    position: 'absolute',
    left: 18, 
    top: 12,
  },

  inValidEmail: {
    paddingTop: 2.5,
    paddingLeft: 50,
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: colors.primaryColor,
  }
}