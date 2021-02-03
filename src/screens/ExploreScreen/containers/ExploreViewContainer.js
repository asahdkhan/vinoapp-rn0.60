import { connect } from 'react-redux'
import modules from 'modules'
import ExploreView from '../components/ExploreView'

const actions = modules.actions.search

const mapDispatchToProps = (dispatch) => ({
  search: (type, data) => dispatch(actions.search({ type, data })),
  featuredWineSearch: (type, data) => dispatch(actions.featuredWineSearch({ type, data })),
  reset: () => dispatch(actions.reset()),
})

const mapStateToProps = ({ feed, locations, user, search, featuredWineResults }) => ({
    ...feed,
    ...search,
    ...featuredWineResults,
    user: user.data,
    redirectTo: user.tab
  })

export default connect(mapStateToProps, mapDispatchToProps)(ExploreView)
