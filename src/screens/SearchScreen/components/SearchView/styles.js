import { Platform } from 'react-native'
import { colors, utils } from 'theme'
import { Dimensions } from "react-native";

/**
 * Styles for search view
 */
export default {
  viewContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  searchField: {
    height: 48,
    flexDirection: 'column',
    textAlign:'auto',
    borderRadius: 24,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 7,
    width: 24,
    height: 24
  },

  input: {
    flex: 5,
    textAlign:'auto',
    alignItems: 'center',
    fontSize: 18 / utils.fontScale,
    backgroundColor: '#FFF',
    paddingLeft: 20,
    color: '#34404c',
    fontFamily: 'Raleway-Regular',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },

  searchCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },

  specialSearchs: {
    flex: 6,
    flexDirection: 'column',
    paddingBottom: 10,
    /* borderWidth: 1,
    borderColor: 'red' */
  },

  title: {
    flex: 1,
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    color: colors.primaryColor,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },

  row: {
    flex: 1,
    paddingLeft: 5,
    paddingTop: 10,
    paddingRight: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,  
      width: 0
    },
  },

  box: {
    flex:1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
   // justifyContent: 'center',
   // alignItems: 'center',
  },

  boxTouch: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    paddingleft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  extraBoxContainer: {
    height: 45,
    width: 250,
    borderRadius: 22,
  //  paddingLeft: 120,
  //  paddingRight: 120,
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    marginTop: 5,
    marginBottom: 20
   // backgroundColor: colors.primaryColor,
  },

  extraBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },  

  extraBoxText: {
    marginLeft: 5,
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
  },

  extraBoxView: {
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  boxIcon: {
    width: 40,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  boxText: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    marginLeft: 10,
  },

  boxArrow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
  
}
