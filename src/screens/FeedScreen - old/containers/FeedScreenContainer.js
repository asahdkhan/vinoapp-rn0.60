import { connect } from 'react-redux'
import modules from 'modules'
import FeedView from '../components/FeedView'
import appUsersModule from '../../../modules/AppUsersModule';

const actions = modules.actions.feed

const mapDispatchToProps = (dispatch) => ({
  fetchFeed: (page, limit) => dispatch(actions.fetchFeed({ page, limit, })),
  fetchPublicFeed: (page, limit) => dispatch(actions.fetchPublicFeed({ page, limit, })),
  setLike: (id, accountId, like) => dispatch(modules.actions.article.setLike({ id, accountId, like, })),
  setFollower : (id, isFollowing) => dispatch(modules.actions.appusers.setFollower({ id, isFollowing,})),
  saveToken: (profileId, token, lang, platform) => dispatch(modules.actions.notifications.saveToken({
    accountId,
    token,
    lang,
    platform,
  }))
})

const mapStateToProps = ({ auth, feed, user, appusers, notifications, }) => ({
  user : user.data,
  token: auth.token,
  loadingFollow: appusers.loadingFollow,
  currentToken: notifications.currentToken,
  ...feed,
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedView)
