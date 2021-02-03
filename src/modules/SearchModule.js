import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import vintageModule from './VintageModule'
import _ from 'lodash'
import api from 'services/api'

const searchModule = createModule({
  name: 'search',
  state: {
    type: 'wines',
    results: [],
    recommendedWineResults: [],
    featuredWineResults: [],
    loading: true,
    total: 0,
    totalPage: 0,
    page: 0,
    limit: 30,
    pages: [],
    order: null,
    wineFilters: {},
    vintagesFilters: {},
    yearsRange: {
      gte: 1920,
      lte: 2019
    },
  },

  handlers: {
    search: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          type: payload.type,
          loading: true,
          results: payload.data.results === 0 ? [] : state.results,
          page: payload.data.page,
          limit: payload.data.limit,
          order: payload.data.order,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          results: payload.data,
          page: payload.page,
          limit: payload.limit,
          total: payload.total,
          order: payload.order,
          pages: payload.pages,
          totalPage: payload.totalPage,
        })
      }
      return state
    },

    recommendedWineSearch: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
          recommendedWineResults: state.recommendedWineResults,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          recommendedWineResults: payload.data
        })
      }
      return state
    },

    getDynamicYears: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          yearsRange: state.yearsRange,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          yearsRange: { gte: payload.gteYear, lte: payload.lteYear }
        })
      }
      return state
    },

    featuredWineSearch: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: false,
          featuredWineResults: state.featuredWineResults
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          featuredWineResults: _.shuffle(payload.data)
        })
      }
      return state
    },


    reset: (state) => {
      return state.merge({
        type: 'wines',
        results: [],
        loading: true,
        total: 0,
        page: 0,
        limit: 30,
        pages: [],
        order: null,
      })
    },

    [vintageModule.actionsTypes.rate]: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.SUCCESS_STATUS) {
        let results = state.results
        if (state.type === 'wines') {
          results = state.results.map(result => {
            if (result.id === payload.rate.wine.id) {
              return {
                ...result,
              }
            }

            return result
          })
        } else {
          results = state.results.map(result => {
            if (result.id === payload.rate.vintage.id) {
              return {
                ...result,
                userRates: [...result.userRates, payload.rate]
              }
            }

            return result
          })
        }

        return state.merge({
          results,
        })
      }

      return state
    }
  },


  effects: {
    search: {
      *callback(actions, { payload, }) {
        const response = payload.type === 'wine' ?
          yield call(api.wines.search, payload.data) :
          yield call(api.vintages.search, payload.data)
        yield put(actions.search({
          data: response.data.data.results,
          page: response.data.data.page,
          limit: response.data.data.limit,
          total: response.data.data.total,
          order: payload.data.order,
          pages: response.data.data.pages,
          totalPage: response.data.data.totalPage
        }, constants.SUCCESS_STATUS))
      }
    },

    getDynamicYears: {
      *callback(actions, { payload, }) {
        const response = payload.type === 'wine' ?
          yield call(api.wines.search, payload.data) :
          yield call(api.vintages.search, payload.data)
        yield put(actions.getDynamicYears({
          gteYear: (response.data.data.results[0] && response.data.data.results[0].year != "0000") ? Number(response.data.data.results[0].year) : 1940,
          lteYear: Number(new Date().getFullYear())
        }, constants.SUCCESS_STATUS))
      }
    },

    recommendedWineSearch: {
      *callback(actions, { payload, }) {
        responses = yield payload.ids.wines.map((data, i) => {  // needs to optimized backend stuff
          let query = {
            ...payload.data,
            filters: { id: data.wineId },
          }
          return call(api.vintages.search, query)
        })

        var results = []
        yield responses.map((res, i) => {
          results.push(res.data.data.results[0])
          if (i == responses.length - 1) {
            return put(actions.recommendedWineSearch({
              data: results,
            }, constants.SUCCESS_STATUS))
          }
        })
      }
    },

    featuredWineSearch: {
      *callback(actions, { payload, }) {
        const response = payload.type === 'wine' ?
          yield call(api.wines.search, payload.data) :
          yield call(api.vintages.search, payload.data)

        yield put(actions.featuredWineSearch({
          data: response.data.data.results,
        }, constants.SUCCESS_STATUS))
      }
    },
  }
})

export default searchModule