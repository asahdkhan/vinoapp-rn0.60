import { colors } from 'theme'

export default {
  argentinaCard: {
    marginTop: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
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

  argentinaDataCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,

  },

  argentinaText: {
    flexWrap: 'wrap',
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    fontSize: 14,
    lineHeight: 20
  },

  argentinaButton: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 30,
    height: 35,
    paddingLeft: 30,
    borderRadius: 20,
    backgroundColor: colors.primaryColor,
  },

  argentinaLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#fff'
  }
}