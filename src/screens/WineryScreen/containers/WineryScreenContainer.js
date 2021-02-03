import { connect } from 'react-redux'
import modules from 'modules'
import WineryView from '../components/WineryView'

const actions = modules.actions.winery

const mapDispatchToProps = (dispatch) => ({
  getDetail: (id) => dispatch(actions.getDetail({ id })),
})

const mapStateToProps = ({ winery, auth, user, }) => ({
  ...winery,
  user : user,
  token: auth.token, 
})

export default connect(mapStateToProps, mapDispatchToProps)(WineryView)
