import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import authModule from './AuthModule'
import api from 'services/api'
import _ from 'lodash'

const locationModule = createModule({
  name: 'locations',
  state: {
    loading   : true,
    wineCount : {},

    results1   : [],
    
    results   : [],
    loadingSearch: true,
    total     : 0,
    page      : 0,
    limit     : 30,
  },

  handlers: {
    getZonesWineCount: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({ loading: true, wineCount: [], })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          wineCount: payload.count
        })
      }

      return state
    },

    reset: (state) => {
      return state.merge({
        results1   : [],
      })
    },

    featuredWineSearch: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingSearch: true,
          results1: payload.page === 0 ? [] : state.results1,
          page   : payload.page,
          limit  : payload.limit,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingSearch: false,
          results1: payload.page === 0 ? payload.data : _.concat(state.results1, payload.data),
          page   : payload.page,
          limit  : payload.limit,
          total  : payload.total,
        })
      }
      return state
    },

    search: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingSearch: true,
          results: payload.page === 0 ? [] : state.results,
          page   : payload.page,
          limit  : payload.limit,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingSearch: false,
          results: payload.page === 0 ? payload.data : _.concat(state.results, payload.data),
          page   : payload.page,
          limit  : payload.limit,
          total  : payload.total,
        })
      }
      return state
    }
  },


  effects: {
    getZonesWineCount: {
      * callback(actions) {
        const response = yield call(api.wines.getZonesWineCount)
        yield put(actions.getZonesWineCount({ count: response.data.data }, constants.SUCCESS_STATUS))
      }
    },

    search: {
      *callback(actions, { payload, }) {
        const response = yield call(api.vintages.search, payload)
        yield put(actions.search({
          data : response.data.data.results,
          page : response.data.data.page,
          limit: response.data.data.limit,
          total: response.data.data.total,
        }, constants.SUCCESS_STATUS))
      }
    },

    featuredWineSearch: {
      *callback(actions, { payload, }) {
        const response = yield call(api.vintages.search, payload)
        yield put(actions.featuredWineSearch({
          data : response.data.data.results,
          page : response.data.data.page,
          limit: response.data.data.limit,
          total: response.data.data.total,
        }, constants.SUCCESS_STATUS))
      }
    }
  },
})

export default locationModule
