import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import api from 'services/api'

const wineMakersModule = createModule({
  name: 'wineMakers',
  state: {
    loading: false,
    wines  : [],
  },

  handlers: {
    fetchWines: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
          wines  : [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          wines  : payload.data,
        })
      }

      return state
    },

    clearData: (state) => {
      return state.merge({
        loading: false,
        wines  : [],
      })
    },
  },


  effects: {
    fetchWines: {
      *callback(actions, {payload, }) {
        const response = yield call(api.wines.search, {
          filters: {
            'winery.id': [payload.id]
          }
        })
        yield put(actions.fetchWines({
          data : response.data.data.results,
        }, constants.SUCCESS_STATUS))
      }
    },
  }
})

export default wineMakersModule
