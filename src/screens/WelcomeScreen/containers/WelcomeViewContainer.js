import { connect } from 'react-redux'
import WelcomeView from '../components/WelcomeView'
import modules from 'modules'

const actions = modules.actions.auth

const mapStateToProps = ({ icons, auth, }) => {
  return {
    icons: icons.icons,
    loading: auth.loading,
    token  : auth.token,
  }
}

const mapDispatchToProps = (dispatch) => ({
  socialLogin: (token) => dispatch(actions.socialLogin(token)),
  guest: (guest) => dispatch(actions.guest({ guest })),
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView)
