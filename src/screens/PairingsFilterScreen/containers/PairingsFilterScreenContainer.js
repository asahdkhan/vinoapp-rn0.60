import { connect } from 'react-redux'
import modules from 'modules'
import PairingsFilterView from '../components/PairingsFilterView'

const actions = modules.actions.pairings

const mapDispatchToProps = (dispatch) => ({})

const mapStateToProps = ({ pairings, }) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PairingsFilterView)
