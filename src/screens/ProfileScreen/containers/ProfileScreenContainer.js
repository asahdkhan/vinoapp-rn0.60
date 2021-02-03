import { connect } from 'react-redux'
import modules from 'modules'
import ProfileView from '../components/ProfileView'

const actions = modules.actions.user

const mapStateToProps = ({ auth, form, user, }) => ({
  token: auth.token,
  user: user.data,
  info: user.info,
})

const mapDispatchToProps = (dispatch) => ({
  getInfo: () => dispatch(actions.getInfo()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
