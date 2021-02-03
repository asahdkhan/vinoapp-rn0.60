/**
 * Styles for ButtonTag
 */
import { colors } from 'theme'

export default {
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 4,
    marginRight: 4,
    //borderColor: 'transparent',
    borderColor: colors.primaryColor,
    flexDirection: 'row',
    marginBottom: 10
  },  

  label: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
    marginRight: 5
  }
}
