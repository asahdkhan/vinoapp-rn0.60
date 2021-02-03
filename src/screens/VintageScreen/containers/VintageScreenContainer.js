import { connect } from 'react-redux'
import modules from 'modules'
import VintageView from '../components/VintageView'

const actions = modules.actions.vintage

const mapDispatchToProps = (dispatch) => ({
  getRelated: (type, data) => dispatch(actions.getRelated({ type, data })),
  getDetail: (id, extras) => dispatch(actions.getDetail({ id, extras })),
  getComments: (id) => dispatch(actions.getComments({id})),
  getRetailers: (id) => dispatch(actions.getRetailers({id})),
  comment: (id, accountId, comment) => dispatch(actions.comment({ id, accountId, comment, })),
  likeComment: (id, accountId, like=true) => dispatch(actions.likeComment({ id, accountId, like, })),
  setWishlist: (vintageId, wishlist) => dispatch(actions.setWishlist({ vintageId, wishlist, })),
  rate: (vintageId, points, comment) => dispatch(actions.rate({ vintageId, points, comment, })),
  clearDetail: () => dispatch(actions.clearDetail()),
})

const mapStateToProps = ({ vintage, relatedResults, auth, user, zones, }) => ({
  ...vintage,
  ...relatedResults,
  user : user.data,
  token: auth.token, 
  zones: zones.zones,
  subZones: zones.subZones,
})

export default connect(mapStateToProps, mapDispatchToProps)(VintageView)
