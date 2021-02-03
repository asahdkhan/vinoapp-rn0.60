/**+
 * Styles for EmptyList
 */

import { colors, } from 'theme'

export default {
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50
  },

  textMessage: {
    fontFamily: 'Raleway-Regular',
    fontSize: 17.5,
    color: '#4a4a4a',
    textAlign: 'center',
  },

  underneathButton: {
    marginTop: 90,
    height: 45,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 22.5,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
  },

  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#fff'
  }
}
