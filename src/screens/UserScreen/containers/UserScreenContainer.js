import { connect } from 'react-redux'
import modules from 'modules'
import UserView from '../components/UserView'

const actions = modules.actions.appusers

const mapStateToProps = ({ user, appusers, }) => ({
  profile: user.data,
  profileExtra: user.info.profile, 
  loading: appusers.loadingDetail,
  user   : appusers.detail,
  loadingFollow: appusers.loadingFollow,
})

const mapDispatchToProps = (dispatch) => ({
  getDetail: (id, extras) => dispatch(actions.getDetail({ id, extras })),
  setFollower : (id, isFollowing) => dispatch(modules.actions.appusers.setFollower({ id, isFollowing,})),
  clearUser: () => dispatch(actions.clearUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
