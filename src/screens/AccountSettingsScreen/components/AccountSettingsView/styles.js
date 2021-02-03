import { Platform } from 'react-native'
import { colors, utils, } from 'theme'

/**
 * Styles for AccountSettingsView
 */
export default {
  viewContainer: {
    flex: 1,
  },

  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 15,
  },
  
  avatar: {
    overflow: 'hidden',
    zIndex: 1,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#CCC',
  },

  changeAvatarBtn: { 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    width: 120,
    height: 30,
    opacity: 1,
    justifyContent: 'center'
  },

  loadingAvatar: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.42)'
  },

  infoContainer: {
    marginBottom: 20,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom : 12,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    color: colors.primaryColor,
    marginLeft: 16,
  },

  saveButtonActive: {
    backgroundColor: colors.primaryColor,
    opacity: 1,
  },

  saveButton: {
    backgroundColor: '#CCC',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 16,
    marginBottom : 0,
    marginRight: 16,
    ...Platform.select({
      android: {
        paddingTop: 0,
      }
    })
  },

  saveButtonTxt: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },

  ntfcPickerContainer: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    flexDirection: 'row',
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
  },

  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    color: '#34404c',
    marginTop: 4,
    flex: 1,
  },
  
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  lang: {
    marginHorizontal: 10,
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
  },

  settingsActionButton: {
    flexDirection: 'row',
    height: 45,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    justifyContent: "flex-start",
    alignItems: "center",
  },

  settingsActionIcon:{
    color: colors.primaryColor,
    paddingRight: 10,
    alignSelf: 'center'
  },

  settingsActionText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    color: '#34404c',
  },

  settingsLogOutButton: {
    marginTop: 10,
    paddingBottom: utils.isIphoneX ? 17 : 0,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
  },
}
