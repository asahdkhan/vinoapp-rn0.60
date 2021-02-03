/**
 * FilterChoice
 */
import { colors } from 'theme'
 
export default {
  viewContainer: {
    flexDirection: 'row',
  },

  button: {
    borderWidth: 1.5,
    borderColor: colors.primaryColor,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    zIndex: 0,
  },

  buttonLeft: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderRightWidth: 0.75,
  },

  buttonRight: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderLeftWidth: 0.75,
  },

  buttonActive: {
    backgroundColor: colors.primaryColor
  },

  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c', 
    backgroundColor: 'transparent',
    //height: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },

  labelActive: {
    fontFamily: 'Raleway-Regular',
    color: '#FFF'
  },

  buttonCenter: {
    backgroundColor: '#FFF',
    //marginLeft: -1,
    //marginRight: -1,
    borderRightWidth: 0.75,
    borderLeftWidth: 0.75,
    flex: 0,
    minWidth: 60
  },
}