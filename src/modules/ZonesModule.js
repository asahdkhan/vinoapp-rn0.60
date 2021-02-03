import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, all, } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/constants'
import api from 'services/api'

const zonesModule = createModule({
  name: 'zones',
  state: {
    zonesLoaded: false,
    zones: [],
    subZones: [],
  },

  handlers: {
    fetchZones: (state, { status, payload, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          zonesLoaded: false,
          zones: [],
          subzones: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          zonesLoaded: true,
          zones: payload.zones,
          subZones: payload.subZones,
        })
      }

      return state
    },

    [REHYDRATE]: (state, { payload }) => {
      return state.merge({
        ...payload.zones
      })
    }
  },


  effects: {
    fetchZones: {
      * callback(actions, { payload }) {
        const [zones, subZones] = yield all([
          api.zones.getAll(),
          api.subZones.getAll(),
        ])
      
        if (zones.ok && subZones.ok) {
          yield put(actions.fetchZones({
            zones: zones.data.data,
            subZones: subZones.data.data,
          }, constants.SUCCESS_STATUS ))
        }
      }
    }
  }
})

export default zonesModule
