import { connect } from 'react-redux'
import modules from 'modules'
import SignupView from '../components/SignupView'

const mapStateToProps = ({ auth, form, }) => ({
  loading: auth.signupLoading,
  errors : auth.signupErrors,
  token  : auth.token,
  //formErrors : form.signup.
})

const mapDispatchToProps = (dispatch) => ({
  signup: (data) => dispatch(modules.actions.auth.signup({data}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupView)
