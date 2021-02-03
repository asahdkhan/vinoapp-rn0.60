import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/constants'
import * as NavigationActionTypes from './actions'

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  currentScreenId: null,
})

/* ------------- Reducer ------------- */
export function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case NavigationActionTypes.SCREEN_CHANGE:
      return state.merge({
        currentScreenId: payload.newScreenId,
      })

    default:
      return state
  }
}
