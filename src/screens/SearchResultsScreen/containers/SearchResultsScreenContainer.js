import { connect } from 'react-redux'
import modules from 'modules'
import SearchResultsView from '../components/SearchResultsView'

const actions = modules.actions.search

const mapDispatchToProps = (dispatch) => ({
  search: (type, data) => dispatch(actions.search({ type, data })),
  reset: () => dispatch(actions.reset()),
})

const mapStateToProps = ({ search, }) => ({
  ...search
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsView)
