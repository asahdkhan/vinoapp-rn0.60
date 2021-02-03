import _ from 'lodash'
import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, all, select, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import userModule from './UserModule'
import api from 'services/api'

const userActions = userModule.actionCreators

const appUsersModule = createModule({
  name: 'appusers',
  state: {
    loading: true,
    data: null,
    page: 0,
    limit: 30,
    total: 0,
    loadingDetail: false,
    detail: null,

    loadingFollow: null,
  },

  handlers: {
    getUsers: (state, { payload, status=constants.PENDING_STATUS}) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
          data: payload.page === 0 ? null : state.data,
          page: payload.page,
          limit: payload.limit,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          data: payload.page === 0 ? payload.data : [...state.data, ...payload.data],
          page: payload.page,
          limit: payload.limit,
          total: payload.total,
        })
      }

      return state
    },

    getDetail: (state, { payload, status=constants.PENDING_STATUS, }) => {
      if (status ===  constants.PENDING_STATUS) {
        return state.merge({
          loadingDetail: true,
          detail: null
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingDetail: false,
          detail   : payload.data,
        })
      }

      return state
    },

    clearList: (state) => {
      return state.merge({
        loading: false,
        data   : null,
        page   : 0,
        limit  : 30,
        total  : 0,
      })
    },

    clearUser: (state) => {
      return state.merge({
        loadingDetail: true,
        detail: null,
      })
    },

    setFollower: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingFollow: payload.id
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingFollow: null,
        })
      }

      return state
    },
  },


  effects: {
    getUsers: {
      *callback(actions, { payload, }) {
        let response
        const { user } = yield select()

        if (payload.term) {
          response = yield call(api.profiles.search, payload.term, payload.page, payload.limit)
        } else {
          response = yield call(api.profiles.getAll, payload.page, payload.limit)
        }

        if (response.ok) {
          let users = payload.term ? response.data.data.profiles : response.data.data
          if (user.data && user.data.accountId) {
            users = users.filter(u => u.id !== user.data.accountId)
          }

          yield put(actions.getUsers({
            data: users,
            page: payload.page,
            limit: payload.limit,
            total: payload.term ? users.length : response.data.total,
          }, constants.SUCCESS_STATUS))
        }
      },
    },

    getDetail: {
      *callback(actions, { payload, }) {
        let [profileResponse, feedResponse] = yield all([
          api.profiles.getDetail(payload.id, payload.extras),
          api.profiles.getFeed(payload.id),
        ])

        if (profileResponse.ok && feedResponse.ok) {
          yield put(actions.getDetail({
            data: {
              ...profileResponse.data.data,
              feed: feedResponse.data.data,
            }
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    setFollower: {
      * callback(actions, { payload, }) {
        let response = yield call(api.profiles.setFollower, payload.id, payload.isFollowing)

        const { user } = yield select()

        if (response.ok) {
          yield put(userActions.getInfo())
          yield put(actions.setFollower({
            ...payload,
            accountId: user.data.accountId,
          }, constants.SUCCESS_STATUS))
        } else {
          
        }
      }
    }
  }
})

export default appUsersModule
