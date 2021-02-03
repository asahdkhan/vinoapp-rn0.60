import { StyleSheet, Dimensions } from 'react-native'
import { colors, utils } from 'theme'

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: '#F5F5F5',
  },

  commentBoxContainer: {
    //position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    minHeight: 48,
    maxHeight: 150,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
    overflow: 'hidden',
    zIndex: 1000,
    paddingTop: 1,
    bottom: 0,
  },

  commentBox: {
    backgroundColor: '#FFF',
    fontSize: 14 / utils.fontScale,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 48,
    maxHeight: 150,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    overflow: 'hidden',
    zIndex: 0,
    paddingTop: 15,
    marginTop: 1,
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
  },

  sendBtn: {
    backgroundColor: colors.primaryColor,
    maxWidth: 48,
    width: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    maxHeight: 150,
  }
});

export default styles
