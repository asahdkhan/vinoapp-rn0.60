import { connect } from 'react-redux'
import modules from 'modules'
import WineView from '../components/WineView'

const actions = modules.actions.wine

const mapDispatchToProps = (dispatch) => ({
  getDetail: (id, extras) => dispatch(actions.getDetail({ id, extras })),
  getComments: (id) => dispatch(actions.getComments({id})),
  getRelated: (wine) => dispatch(actions.getRelated({wine})),
  getPairings: (pairings) => dispatch(actions.getPairings(pairings)),
  setFavorite: (wineId, favorite) => dispatch(actions.setFavorite({ wineId, favorite, })),
  comment: (id, accountId, comment) => dispatch(actions.comment({ id, accountId, comment, })),
  likeComment: (id, accountId, like=true) => dispatch(actions.likeComment({ id, accountId, like, })),
  clearDetail: () => dispatch(actions.clearDetail()),
})

const mapStateToProps = ({ wine, auth, user, zones, }) => ({
  ...wine,
  user : user.data,
  token: auth.token,
  zones: zones.zones,
  subZones: zones.subZones,
})

export default connect(mapStateToProps, mapDispatchToProps)(WineView)
