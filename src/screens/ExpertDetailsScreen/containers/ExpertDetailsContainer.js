import { connect } from 'react-redux'
import modules from 'modules'
import ExpertDetailsView from '../components/ExpertDetailsView'

const actions = modules.actions.search

const mapDispatchToProps = (dispatch) => ({
  recommendedWineSearch: (type, data, ids) => dispatch(actions.recommendedWineSearch({ type, data, ids })),
  reset: () => dispatch(actions.reset()),
})

const mapStateToProps = ({ feed, locations, user, search }) => ({
    ...search,
  })


export default connect(mapStateToProps, mapDispatchToProps)(ExpertDetailsView)
