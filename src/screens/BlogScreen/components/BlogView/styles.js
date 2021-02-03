/**
 * Styles for FeedView
 */
import { colors } from 'theme'

export default {
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        shadowColor: "#000000",
        shadowOpacity: 0.17,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
    },

    title: {
        color: colors.primaryColor,
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
        textAlign: 'center',
    },

    settingsActionIcon: {
        color: colors.primaryColor,
        paddingRight: 10,
        alignSelf: 'center'
    },

    settingsActionText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16,
        color: '#34404c',
      },    

    /* shortDesc: {
        paddingTop: 10,
        paddingBottom: 20,
        color: "34404c",
        fontFamily: 'Raleway-Regular',
        fontSize: 14,
        textAlign: 'center',
    }, */

    authorName: {
        color: "34404c",
        fontFamily: 'Raleway-Bold',
        fontSize: 14,
        textAlign: 'center',
    },

    date: {
        color: colors.primaryColor,
        fontFamily: 'Raleway-Bold',
        fontSize: 14,
        textAlign: 'center',
    }
}