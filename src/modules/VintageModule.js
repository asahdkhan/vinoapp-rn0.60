import _ from 'lodash'
import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import I18n from 'react-native-i18n'
import authModule from './AuthModule'
import api from 'services/api'

const wineModule = createModule({
  name: 'vintage',
  state: {
    loading: false,
    loadingRelated: false,
    relatedResults: [],
    data: null,
    loadingComments: false,
    comments: [],
    loadingRetailers: false,
    retailers: [],
    loadingRate: false,
    rateIt: false,
  },

  handlers: {
    getDetail: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          data: payload.data,
        })
      }

      return state
    },

    getComments: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingComments: true,
          comments: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingComments: false,
          comments: payload.data,
        })
      }

      return state
    },


    getRetailers: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingRetailers: true,
          retailers: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingRetailers: false,
          retailers: payload.data,
        })
      }

      return state
    },

    comment: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          creatingComment: true,
          commentCreated: false,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          creatingComment: false,
          commentCreated: true,
          comments: [
            payload.comment,
            ...state.comments,
          ]
        })
      }

      if (status === constants.FAILED_STATUS) {
        return state.merge({
          creatingComment: false,
        })
      }

      return state
    },

    likeComment: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.SUCCESS_STATUS) {
        let comments = state.comments.map(comment => {
          if (comment.id === payload.comment.id) {
            return {
              ...comment,
              likes: payload.comment.likes,
            }
          }

          return comment
        })

        return state.merge({
          comments,
        })
      }

      return state
    },

    setWishlist: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (!state.data) {
        return state
      }

      let wishlistOff = _.clone(state.data.wishlistOff)

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          data: {
            ...state.data,
            wishlistOff: payload.wishlist ?
              _.concat(wishlistOff, [payload.profile]) :
              wishlistOff.filter((u) => u.id !== payload.profile.id)
          }
        })
      }

      if (status === constants.FAILED_STATUS) {
        return state.merge({
          data: {
            ...state.data,
            wishlistOff: !payload.wishlist ?
              _.concat(wishlistOff, [{ id: payload.profile }]) :
              wishlistOff.filter((u) => u.id !== payload.profile)
          }
        })
      }

      return state
    },

    rate: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (!state.data) {
        return state
      }

      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingRate: true,
          rateIt: false,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        let userRates = _.clone(state.data.userRates)
        userRates.push(payload.rate)

        return state.merge({
          data: {
            ...state.data,
            userRates,
          },
          loadingRate: false,
          rateIt: true,
        })
      }

      return state
    },

    getRelated: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingRelated: true,
          relatedResults: state.relatedResults
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingRelated: false,
          relatedResults: _.shuffle(payload.data)
        })
      }
      return state
    },

    clearDetail: (state) => {
      return state.merge({
        loading: false,
        loadingRelated: false,
        relatedResults: [],
        data: null,
        loadingComments: false,
        comments: [],
        loadingRate: false,
        rateIt: false,
      })
    },
  },

  effects: {
    getRelated: {
      *callback(actions, { payload, }) {
        const response = payload.type === 'wine' ?
          yield call(api.wines.search, payload.data) :
          yield call(api.vintages.search, payload.data)

        yield put(actions.getRelated({
          data: response.data.data.results,
        }, constants.SUCCESS_STATUS))
      }
    },

    getDetail: {
      * callback(actions, { payload, }) {
        let response = yield call(api.vintages.getDetail, payload.id, payload.extras)

        if (response.ok) {
          yield put(actions.getDetail({
            data: response.data.data
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    getComments: {
      * callback(actions, { payload, }) {
        let response = yield call(api.vintages.getComments, payload.id, payload.extras)

        if (response.ok) {
          yield put(actions.getComments({
            data: response.data.data
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    getRetailers: {
      * callback(actions, { payload, }) {
        let response = yield call(api.vintages.getRetailers, payload.id)

        if (response.ok) {
          yield put(actions.getRetailers({
            data: response.data.data
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    comment: {
      * callback(actions, { payload, }) {
        let response = yield call(api.vintages.comment, payload.id, payload.accountId, payload.comment)

        if (response.ok) {
          yield put(actions.comment({
            comment: response.data.data,
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.comment(payload, constants.SUCCESS_STATUS))
        }
      }
    },

    likeComment: {
      * callback(actions, { payload, }) {
        let response = yield call(api.vintages.likeComment, payload.id, payload.accountId, payload.like)

        if (response.ok) {
          yield put(actions.likeComment({
            comment: response.data.data,
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.likeComment(payload, constants.SUCCESS_STATUS))
        }
      }
    },

    setWishlist: {
      * callback(actions, { payload, }) {
        let response = yield call(api.vintages.setWishlist, payload.vintageId, payload.wishlist)

        if (response.ok) {
          yield put(actions.setWishlist({
            vintage: response.data.data.vintage,
            profile: response.data.data.profile,
            wishlist: payload.wishlist,
            message: payload.wishlist ? I18n.t('wine.added_to_wishlist') : I18n.t('wine.removed_from_wishlist')
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.setWishlist({}, constants.FAILED_STATUS))
        }
      }
    },

    rate: {
      * callback(actions, { payload, }) {
        let response = yield call(api.vintages.rate, payload.vintageId, payload.points, payload.comment)

        if (response.ok) {
          yield put(actions.rate({
            rate: response.data.data,
            message: I18n.t('wine.rate')
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.rate({
            message: I18n.t('wine.rate_error')
          }, constants.FAILED_STATUS))
        }
      }
    }
  }
})

export default wineModule
