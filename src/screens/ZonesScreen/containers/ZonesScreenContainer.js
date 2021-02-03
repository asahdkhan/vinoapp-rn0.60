import { connect } from 'react-redux'
import modules from 'modules'
import ZonesView from '../components/ZonesView'

const actions = modules.actions.search

const mapDispatchToProps = (dispatch) => ({
    reset: () => dispatch(actions.reset()),
})
const mapStateToProps = ({ locations, }) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ZonesView)
