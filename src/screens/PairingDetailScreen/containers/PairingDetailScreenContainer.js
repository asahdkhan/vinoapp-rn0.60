import { connect } from 'react-redux'
import modules from 'modules'
import PairingDetailView from '../components/PairingDetailView'

const actions = modules.actions.pairings

const mapDispatchToProps = (dispatch) => ({
  searchPairingWines: (pairingId) => dispatch(actions.searchPairingWines(pairingId)),
  searchRelated: (foodType, ingredient, currentPairing=false) => 
    dispatch(actions.searchRelated({ foodType, ingredient, currentPairing})),
  selectPairing: (pairing) => dispatch(actions.selectPairing({ pairing})),
  clearDetail: () => dispatch(actions.clearDetail()),
})

const mapStateToProps = ({ pairings, nav, }) => ({
  selectedPairing : pairings.selectedPairing,
  loadingVideos  : pairings.loadingVideos,
  relatedPairings: pairings.relatedPairings, 
  loadingWines   : pairings.loadingWines,
  relatedWines   : pairings.relatedWines,
  screenId       : nav.currentScreenId,
})

export default connect(mapStateToProps, mapDispatchToProps)(PairingDetailView)
