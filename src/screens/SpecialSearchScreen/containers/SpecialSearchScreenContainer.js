import { connect } from 'react-redux'
import modules from 'modules'
import SpecialSearchView from '../components/SpecialSearchView'

const actions = modules.actions.locations

const mapDispatchToProps = (dispatch) => ({})
const mapStateToProps = ({ locations, }) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SpecialSearchView)
