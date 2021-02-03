import { Platform } from 'react-native'
import { colors } from 'theme'

/**
 * Styles for SearchUserView
 */
export default {
  viewContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    backgroundColor: colors.primaryColor,
    height: 55,
    paddingLeft: 12.5,
    paddingRight: 12.5,
    paddingTop: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },

  searchField: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: 'red',
    flexDirection: 'row',
    overflow: 'hidden',
  },

  searchIcon: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        left: 0,
        top: 0,
      },
      android: {
        right: 0,
        top:0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8
      }
    }),
    // width: 24,
    // height: 24,
    width: 50,
    height: 40,
    backgroundColor: '#095c32',
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        paddingLeft: 60,
      },
      android: {
        paddingLeft: 15,
      }
    }),
    borderRadius: 8,
    //paddingLeft: 35,
    color: '#4a4a4a',
    fontFamily: 'GothamRounded-Book',
  },


  list: {
    flex: 1,
  },

  listInner : {
    backgroundColor: '#FFF',
    margin:8 ,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  btnClearSearch : {
    position: 'absolute',
    right: 10,
    height: 40,
    top: 0,
    paddingHorizontal: 5,
    justifyContent: 'center'
  },

  btnClearSearchText : {
    fontSize: 12,
    color: '#34a06a',
    fontFamily: 'GothamRounded-Book'
  }
}
