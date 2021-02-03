import { connect } from 'react-redux'
import modules from 'modules'
import PairingsView from '../components/PairingsView'

const actions = modules.actions.pairings

const mapDispatchToProps = (dispatch) => ({
  searchPairigns: (foodType, ingredient, currentPairing=false) => 
    dispatch(actions.searchPairigns({ foodType, ingredient, currentPairing})),
  selectPairing: (pairing) => dispatch(actions.selectPairing({ pairing})),
})

const mapStateToProps = ({ pairings, }) => ({
  loading  : pairings.loading,
  pairings : pairings.pairings, 
})

export default connect(mapStateToProps, mapDispatchToProps)(PairingsView)
