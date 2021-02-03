import { connect } from 'react-redux'
import modules from 'modules'
import SearchUserView from '../components/SearchUserView'

const actions = modules.actions.appusers

const mapStateToProps = ({ auth, appusers, user, }) => ({
  loading: appusers.loading,
  data   : appusers.data,
  page   : appusers.page,
  limit  : appusers.limit,
  total  : appusers.total,
  info   : user.info,
  loadingInfo: user.loadingInfo,
})

const mapDispatchToProps = (dispatch) => ({
  getInfo  : () => dispatch(modules.actions.user.getInfo()),
  getUsers : (term, page=0, limit=30) => dispatch(actions.getUsers({term, page, limit})),
  clearList: () => dispatch(actions.clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserView)
