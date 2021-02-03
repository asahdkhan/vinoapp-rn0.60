import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, all, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import authModule from './AuthModule'
import api from 'services/api'

const wineryModule = createModule({
  name: 'winery',
  state: {
    loading: false,
    data: null,
    
    detail: null,
    reputation: null,
    vintages: null,
    loadingDetail: false,
  },

  handlers: {
    getAll: (state, { payload, status=constants.PENDING_STATUS}) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
          data: null,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          data   : payload.data,
        })
      }

      return state
    },

    getDetail: (state, { payload, status=constants.PENDING_STATUS}) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingDetail: true,
          detail: null,
          reputation: null,
          vintages: null,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingDetail: false,
          detail: payload.data,
          reputation: payload.reputation,
          vintages     : payload.vintages,
        })
      }

      return state
    },

    resetDetail: (state) => {
      return state.merge({
        loadingDetail: false,
        detail: null,
        reputation: null,
        vintages: null,
      })
    },
  },


  effects: {
    getAll: {
      *callback(actions) {
        const response = yield call(api.wineries.getAll, { 'sort': 'name%20ASC' })

        if (response.ok) {
          yield put(actions.getAll({
            data: response.data.data,
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    getDetail: {
      *callback(actions, { payload, }) {
        const [ wineryResponse, vintagesResponse, reputationResponse, ] = yield all([
          api.wineries.getDetail(payload.id),
          api.vintages.search({ filters: {'winery.id': payload.id }}),
          api.wineries.getReputation(payload.id),
        ])

        if (wineryResponse.ok && vintagesResponse.ok && reputationResponse.ok) {
          yield put(actions.getDetail({
            data : wineryResponse.data.data,
            vintages: vintagesResponse.data.data.results,
            reputation: reputationResponse.data.data.reputation,
          }, constants.SUCCESS_STATUS))
        }
      }
    }
  },
})

export default wineryModule
