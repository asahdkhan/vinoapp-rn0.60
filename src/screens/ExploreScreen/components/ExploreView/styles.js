import { Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;


export default {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },

  shadowCard: {
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  postTitle: {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: '#34404c',
    paddingTop: 10,
    paddingBottom: 10
  },

  goToSearchCard: {
    marginTop: 10,
    backgroundColor: '#fff',
  },

  goToSearchText: {
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2
  },

  featuredCard: {
    height: 320,
    marginTop: 10,
    backgroundColor: '#FFF',
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




  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
}