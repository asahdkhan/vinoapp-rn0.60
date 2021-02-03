import { connect } from 'react-redux'
import modules from 'modules'
import IconActionCreators from 'modules/icons/actions'
import RootView from '../components/RootView'

const actions = modules.actions.zones

const mapStateToProps = ({ app, auth, icons, user, zones, }) => {
  return {
    loaded: app.loaded,
    iconsLoaded: icons.loaded,
    icons : icons.icons,
    token : auth.token,
    guest : auth.guest,
    zonesLoaded: zones.zonesLoaded,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadIcons: (icons) => dispatch(IconActionCreators.loadIcons(icons)),
  fetchZones: () => dispatch(actions.fetchZones()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootView)
