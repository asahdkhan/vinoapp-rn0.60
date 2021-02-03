import { connect } from 'react-redux'
import modules from 'modules'
import ForgotPasswordView from '../components/ForgotPasswordView'

const mapStateToProps = ({ auth, icons, }) => ({
  loading: auth.forgotLoading,
  errors : auth.forgotErrors,
})

const mapDispatchToProps = (dispatch) => {
  return ({
    forgotPassword: (email) => dispatch(modules.actions.auth.forgotPassword({email}))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordView)
