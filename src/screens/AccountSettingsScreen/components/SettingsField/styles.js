/**
 * Styles for SettignField
 */
import { colors, utils } from 'theme'

export default {
  viewContainer: {
    height: 45,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    //borderBottomColor: '#9b9b9b',
    borderBottomColor: '#dadada',
    flexDirection: 'row',
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10
  },

  multiline: {
    height: 120,
    paddingTop: 15,
    alignItems: "flex-start",
  },

  label: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
  },

  labelIcon: {
    flex: 1,
    paddingRight: 10,
    alignSelf: 'center',
    color: colors.primaryColor
  },

  labelText: {
    flex: 4,
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    color: '#34404c',
  },

  value: {
    flex: 1,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 15 / utils.fontScale,
    color: '#34404c',
    //lineHeight: 18,
    flex: 1,
    textAlign: 'left',
    marginRight: 8,
    height: '100%',
  }
}
