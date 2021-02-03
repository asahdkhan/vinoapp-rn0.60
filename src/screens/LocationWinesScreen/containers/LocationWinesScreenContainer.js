import { connect } from 'react-redux'
import modules from 'modules'
import LocationWinesView from '../components/LocationWinesView'

const locationsActions = modules.actions.locations
const searchActions = modules.actions.search

const mapDispatchToProps = (dispatch) => ({
  search: (data) => dispatch(locationsActions.search(data)),
  reset: () => dispatch(locationsActions.reset()),
})

const mapStateToProps = ({ locations, }) => ({
  loading: locations.loadingSearch,
  results: locations.results,
  total  : locations.total,
  page   : locations.page,
  limit  : locations.limit,
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationWinesView)
