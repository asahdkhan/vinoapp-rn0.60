/**
 * Styles for FilterButton
 */
import { colors } from 'theme'

export default {
  filterButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    // marginLeft: 4,
    // marginRight: 4,
    borderColor: 'transparent',
    //minWidth: 70
  },

  filterButtonActive: {
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },

  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
  },

  labelActive: {
    color: colors.primaryColor
  }
}
