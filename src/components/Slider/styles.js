import { colors, } from 'theme'

/**
 * Styles for Slider
 */
export default {
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  label: {
    fontFamily: 'Raleway-Regular',
    color: '#34404c', 
    fontSize: 16,
   // marginTop: 10,
    marginHorizontal: 15,
  },

  valueContainer: {
    position: 'absolute',           
    top: 35,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{
      translateX: -18
    }]
  },

  valueText: {
    fontFamily: 'Raleway-Regular',
    color: '#34404c', 
    fontSize: 14,
   },

  valueContainerActive: {
    top: -60,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.primaryColor,
    transform: [{
      translateX: -18
    }]
   },

   valueTextActive: {
    fontSize: 13, 
    color: '#FFF',
    marginTop: -3,
    fontWeight: '400',
   },

   triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderBottomWidth: 20,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: colors.primaryColor,
      position: 'absolute',
      bottom: -12,
      left: 16,
      transform: [
        {rotate: '180deg'}
      ]
   },


 }