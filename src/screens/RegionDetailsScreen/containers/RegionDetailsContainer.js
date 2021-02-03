import { connect } from 'react-redux'
import modules from 'modules'
import RegionDetails from '../components/RegionDetailsView'

const locationsActions = modules.actions.locations
const searchActions = modules.actions.search


const mapStateToProps = ({ feed, locations, user }) => ({
  ...feed,
  user: user.data,
  loading: locations.loadingSearch,
  locations: locations,
  results1: locations.results1,
  total: locations.total,
  page: locations.page,
  limit: locations.limit,
})

const mapDispatchToProps = (dispatch) => ({
  featuredWineSearch: (data) => dispatch(locationsActions.featuredWineSearch(data)),
  reset: () => dispatch(locationsActions.reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegionDetails)
