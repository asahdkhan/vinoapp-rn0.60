import Immutable from 'seamless-immutable'
import Snackbar from 'react-native-snackbar'
import * as MessageActionTypes from './actions'

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  message  : null,
  duration : Snackbar.LENGTH_LONG,
})

/* ------------- Reducer ------------- */
export function reducer(state = INITIAL_STATE, { type, payload={} }) {
  if (payload.message) {
    return state.merge({
      message: payload.message,
    })
  }

  if (payload.notify && payload.notify.message) {
    return state.merge({ ...payload.notify })
  }

  if (type === MessageActionTypes.CLEAR_MESSAGE) {
    return state.merge({
      message: null
    })
  }

  return state
}
