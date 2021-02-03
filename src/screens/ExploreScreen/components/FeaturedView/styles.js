import { Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;


export default {
  postTitle: {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: '#34404c',
    paddingTop: 10,
    paddingBottom: 10
  },

  featuredCard: {
    height: 340,
    marginTop: 10,
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  swiperWrapper: {
    backgroundColor: '#fff',
    // paddingVertical: 5,
    // marginRight: 10,
    //marginLeft: 10
  },

  slider: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },
}