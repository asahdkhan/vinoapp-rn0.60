import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import authModule from './AuthModule'
import api from 'services/api'

const locationModule = createModule({
  name: 'pairings',
  state: {
    loading : false,
    loadingVideos: false,
    loadingWines: false,
    pairings : [],
    relatedPairings: [],
    relatedWines: [],
    selectedPairing: null,
  },

  handlers: {
    selectPairing: (state, { payload, }) => {
      return state.merge({
        selectedPairing: payload.pairing,
      })
    },
    searchPairigns: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
          pairings: [],
          relatedPairings: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          pairings: payload.data,
        })
      }

      return state
    },

    searchPairingWines: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingWines: true,
          relatedWines: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingWines: false,
          relatedWines: payload.data,
        })
      }
    },

    searchRelated: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingVideos: true,
          relatedPairings: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingVideos: false,
          relatedPairings: payload.data,
        })
      }
      
      return state
    },

    clearDetail: (state) => {
      return state.merge({
        loadingVideos: false,
        loadingWines: false,
        relatedPairings: [],
        relatedWines: [],
      })
    },
  },


  effects: {
    searchPairigns: {
      *callback(actions, {payload, }) {
        const { foodType, ingredient, currentPairing, } = payload
        const response = yield call(api.pairings.search, foodType, ingredient, currentPairing)
        yield put(actions.searchPairigns({
          data: response.data.data
        }, constants.SUCCESS_STATUS))
      }
    },

    searchPairingWines: {
      *callback(actions, {payload, }) {
        const response = yield call(api.pairings.relatedWines, payload)
        yield put(actions.searchPairingWines({
          data: response.data.data
        }, constants.SUCCESS_STATUS))
      }
    },

    searchRelated: {
      *callback(actions, {payload, }) {
        const { foodType, ingredient, currentPairing, } = payload
        const response = yield call(api.pairings.search, foodType, ingredient, currentPairing, 4)
        yield put(actions.searchRelated({
          data: response.data.data
        }, constants.SUCCESS_STATUS))
      }
    },
  }
})

export default locationModule
