import { connect } from 'react-redux'
import modules from 'modules'
import LocationsView from '../components/LocationsView'

const actions = modules.actions.locations

const mapDispatchToProps = (dispatch) => ({
  getZonesWineCount: () => dispatch(actions.getZonesWineCount())
})

const mapStateToProps = ({ locations, }) => ({
  loading  : locations.loading,
  wineCount: locations.wineCount, 
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationsView)
