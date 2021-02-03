import { colors } from 'theme'

export default {
	mainTitle: {
		paddingTop: 20,
		paddingBottom: 10,
		paddingLeft: 20,
		fontFamily: 'Raleway-Regular',
		fontSize: 17,
		color: colors.primaryColor
	},

	header: {
		height: 55,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: "#000000",
		shadowOpacity: 0.17,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
	},

	headerText: {
		textAlign: 'center',
		position: 'absolute',
		left: 0,
		marginLeft: 20,
		fontSize: 18,
	},

	icon: {
		marginRight: 20,
		position: 'absolute',
		right: 0,
	},

	content: {
		marginTop: 10,
	}
}