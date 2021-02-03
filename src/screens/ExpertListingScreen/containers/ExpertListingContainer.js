import { connect } from 'react-redux'
import modules from 'modules'
import ExpertListingView from '../components/ExpertListingView'

const actions = modules.actions.locations

const mapDispatchToProps = (dispatch) => ({})
const mapStateToProps = ({ locations, }) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ExpertListingView)
