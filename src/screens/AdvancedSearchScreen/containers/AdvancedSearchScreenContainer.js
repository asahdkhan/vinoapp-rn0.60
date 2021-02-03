import { connect } from 'react-redux'
import modules from 'modules'
import AdvancedSearchView from '../components/AdvancedSearchView'

const actions = modules.actions.search

const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = ({ search }) => ({
    years: search.yearsRange
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchView)
