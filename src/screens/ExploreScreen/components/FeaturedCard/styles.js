/**
 * Styles for MentionCard
 */
import { Dimensions } from 'react-native'
let deviceWidth =  Dimensions.get('window').width

export default {
  card: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  shadow: {
    shadowColor: "#000000",
    shadowOpacity: 0.34,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 5
  },

  wineName: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#34404c',
  },

  wineryName: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
  },

  location: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
  },

  varieties: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    padding: 3,
    marginRight: 5
  },

  varietyText: {
    alignSelf: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
  },

  imageContainer: {
    width: 70,
    height: 250,
    top: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    position: 'absolute',
    right: deviceWidth * 0.05,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
