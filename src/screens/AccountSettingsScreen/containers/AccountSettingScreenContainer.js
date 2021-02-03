import { connect } from 'react-redux'
import modules from 'modules'
import AccountSettingsView from '../components/AccountSettingsView'

const actions = modules.actions.user

const mapStateToProps = ({ auth, form, user, i18n, }) => ({
  user: user.data,
  redirectTo: user.tab,
  info: user.info,
  dirtyForm: user.dirtyForm,
  uploadingAvatar: user.uploadingAvatar,
  lang: i18n.lang,
  updatingInfo: user.updatingInfo,
  initialValues: user.data ? {
    name    : user.data.name,
    email   : user.data.email,
    location: user.data.location,
    states: user.data.states,
    info    : user.data.info,
    password: '@@NULL'
  } : {}
})

const mapDispatchToProps = (dispatch) => ({
  updateTab   : (tab)  => dispatch(actions.updateTab( tab )),
  updateInfo  : (info)  => dispatch(actions.updateInfo({ info })),
  changeAvatar: (photo) => dispatch(actions.changeAvatar({ photo })),
  changeLang  : (lang)  => dispatch(modules.actions.i18n.changeLang({ lang })),
  sendMessage : (message) => dispatch(actions.sendMessage({ message })),
  logout      : () => dispatch(modules.actions.auth.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsView)
