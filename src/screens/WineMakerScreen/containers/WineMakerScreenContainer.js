import { connect } from 'react-redux'
import modules from 'modules'
import WineMakerView from '../components/WineMakerView'

const actions = modules.actions.wineMakers
const wineActions = modules.actions.wine

const mapDispatchToProps = (dispatch) => ({
  fetchWines: (id) => dispatch(actions.fetchWines({ id, })),
  clearDetail: ()  =>  dispatch(wineActions.clearDetail()),
})

const mapStateToProps = ({ auth, user, wineMakers, nav, }) => ({
  ...wineMakers,
  user : user,
  token: auth.token, 
  screenId: nav.currentScreenId,
})

export default connect(mapStateToProps, mapDispatchToProps)(WineMakerView)
