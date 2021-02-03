import { connect } from 'react-redux'
import modules from 'modules'
import NotificationsView from '../components/NotificationsView'

const actions = modules.actions.notifications

const mapStateToProps = ({ auth, form, notifications, }) => ({
  notifications: notifications.list,
})

const mapDispatchToProps = (dispatch) => ({
  readNotification: (id) => dispatch(actions.readNotification({ id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsView)
