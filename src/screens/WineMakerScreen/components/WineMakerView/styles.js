/**
 * Styles for WineMakerView
 */
import { colors } from 'theme'

export default {
  title: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    color: colors.primaryColor,
    marginLeft: 14,
    marginRight: 14,
  },

  subTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
    marginTop: 5,
    marginLeft: 14,
    marginRight: 14,
  },


  control: {
    position: 'absolute',
    width: '100%',
    height: 320,
    overflow: 'hidden',
    top: 0
  },

  overlay: {
    width: '100%',
    height: 330,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },


  loadingContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },

  relatedWinesContainer: {
    backgroundColor: '#F5F5F5',
    marginTop: 32,
  },

  relatedTitle: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
    color: '#34404c',
    marginBottom: 14,
    marginLeft: 14,
    marginRight: 14,
  },

  videosContainer: {
    height: 320,
    flexDirection:'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    zIndex: -1,
    marginTop: 0,
  },

  content: {
    backgroundColor: '#F5F5F5',
    marginTop: 0,
    flex: 1,
    paddingTop: 0,
    zIndex: 10,
  },
}
