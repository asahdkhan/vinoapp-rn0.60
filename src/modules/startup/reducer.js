import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/constants'
import * as StartupActionTypes from './actions'
import { api, } from 'services/api'

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  loaded: false,

})

/* ------------- Reducer ------------- */
export function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case StartupActionTypes.STARTUP:
      return state.merge({
        loaded: false,
      })

    case StartupActionTypes.STARTUP_FINISHED:
      // if (payload.token) {
      //   api.setHeaders({
      //     Authorization: `JWT ${payload.token}`,
      //   })
      // }

      return state.merge({
        loaded: true,
      })

    default:
      return state
  }
}
