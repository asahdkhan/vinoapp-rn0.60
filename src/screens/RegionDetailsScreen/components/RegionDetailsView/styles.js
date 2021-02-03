import { Platform } from 'react-native'
export default {

    cover: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        width: null,
        height: null,
    },

    header: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 70 : 82
      },

    headerOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    headerTitle: {
      fontSize: 32,
      fontFamily: 'Raleway-Regular',
      color: '#FFF',
      textAlign: 'center',
    },
      
    coverContainer: {
      flexDirection: 'row',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#000'
    },

    container: {
      flex: 1,
      marginRight: 5,
      marginLeft: 5,
    },

    card: {
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

    detailsCard: {
      flexWrap: 'wrap',
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 10 
    },

    detailsCardTitle: {

    },

    detailsCardDesc: {
      fontFamily: 'Raleway-Regular',
      fontSize: 14,
      color: '#34404c',
    }

}   