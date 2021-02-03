import { connect } from 'react-redux'
import modules from 'modules'
import LoginView from '../components/LoginView'

const mapStateToProps = ({ auth, icons, }) => ({
  icons  : icons.icons,
  loading: auth.loading,
  errors : auth.errors,
  token  : auth.token,
})

const mapDispatchToProps = (dispatch) => {
  return ({
    login: (email, password) => dispatch(modules.actions.auth.login({email, password}))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
