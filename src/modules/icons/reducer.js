import Immutable from 'seamless-immutable'
import * as IconActionsTypes from './actions'

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  loaded: false,
  icons : {},
})

/* ------------- Reducer ------------- */
export function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case IconActionsTypes.LOADING_ICONS:
      return state.merge({
        loaded: false,
      })

    case IconActionsTypes.LOADING_ICONS_SUCCESS:
      return state.merge({
        loaded: true,
        icons : payload.icons,
      })

    case IconActionsTypes.LOADING_ICONS_FAILURE:
      return INITIAL_STATE

    default:
      return state
  }
}
