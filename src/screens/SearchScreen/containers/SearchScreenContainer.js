import { connect } from 'react-redux'
import modules from 'modules'
import SearchView from '../components/SearchView'

const actions = modules.actions.search

const mapDispatchToProps = (dispatch) => ({
    getDynamicYears: (type, data) => dispatch(actions.getDynamicYears({ type, data })),
})

const mapStateToProps = ({ locations, }) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SearchView)
