/**
 * Styles for MainAromasIcon
 */
import { colors } from 'theme'

export default {
  aroma: {
   // borderLeftWidth: 0.5,
   // borderLeftColor: '#34404c',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFF',
    paddingVertical: 7,
  },

  aromaIcon: {
    width: 25,
    height: 25,
    marginBottom: 2,
    backgroundColor: '#FFF'
  },

  aromaName: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
    paddingVertical: 7,
    textAlign: 'center',
  },

  aromaCount: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12.5,
    color: colors.primaryColor,
    position: 'absolute',
    left: 5,
    top: 2.5
  },
}
