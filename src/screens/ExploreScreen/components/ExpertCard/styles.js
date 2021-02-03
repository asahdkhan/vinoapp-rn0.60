import { Dimensions } from 'react-native';

export default {

  expertsCard: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    backgroundColor: '#fff',
  },

  shadow: {
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


  swiperWrapper: {
    backgroundColor: '#fff',
  },

  slider: {
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5
  },

  sliderSection: {
    flexDirection: 'column',
    width: 33.33 + '%',
   // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 2
  },

  secImage: {
    width: 100 + '%',
    height: 100
  },

  secText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
    paddingTop: 10,
    paddingBottom: 10
  },

  expertAddOn: {
    backgroundColor: '#fff',
  },

  expertDesc: {
    flex: 2, 
    marginLeft: 10 
  },

  expertDescLabels: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#34404c',
  },

  expertDetailsCont: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20 
  }
}