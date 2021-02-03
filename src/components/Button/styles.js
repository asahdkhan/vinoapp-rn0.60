import { Platform, } from 'react-native'
import { colors, utils, } from 'theme'

export default {
  button: {
    backgroundColor: colors.primaryColor,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },

  rounded: {
    borderRadius: 24,
  },

  label: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'Raleway-Regular',
    color: '#FFF',
    ...Platform.select({
      ios: {
        marginTop: 4
      }
    })
  },

  action: {
    height: utils.isIphoneX ? 65 : 48,
    paddingBottom: utils.isIphoneX ? 17 : 0,
  },
}
