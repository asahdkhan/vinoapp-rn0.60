import _ from 'lodash'
import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import I18n from 'react-native-i18n'
import authModule from './AuthModule'
import api from 'services/api'

const wineModule = createModule({
  name: 'wine',
  state: {
    loading: false,
    data: null,
    loadingComments: false,
    comments: [],
    loadingRelated: false,
    relatedWines: [],
    
    creatingComment: false,
    commentCreated: false,

    loadingPairings: false,
    pairings: [],
  },

  handlers: {
    getDetail: (state, { payload, status=constants.PENDING_STATUS, }) => {
      if (status ===  constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
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

    getComments: (state, { payload, status=constants.PENDING_STATUS }) => {
      if (status ===  constants.PENDING_STATUS) {
        return state.merge({
          loadingComments: true,
          comments: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingComments: false,
          comments       : payload.data,
        })
      }

      return state
    },

    getRelated: (state, { payload, status=constants.PENDING_STATUS }) => {
      if (status ===  constants.PENDING_STATUS) {
        return state.merge({
          loadingRelated: true,
          relatedWines: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingRelated: false,
          relatedWines       : payload.data,
        })
      }

      return state
    },

    getPairings: (state, { payload, status = constants.PENDING_STATUS}) => {
      if (status ===  constants.PENDING_STATUS) {
        return state.merge({
          loadingPairings: true,
          pairings: [],
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingPairings: false,
          pairings       : payload.data,
        })
      }

      return state
    },

    setFavorite: (state, { payload, status = constants.PENDING_STATUS}) => {
      if (!state.data) {
        return state
      }

      let favoriteOff = _.clone(state.data.favoriteOff)

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          data: {
            ...state.data,
            favoriteOff: payload.favorite ? 
              _.concat(favoriteOff, [ payload.profile ]) : 
              favoriteOff.filter((u) => u.id !== payload.profile.id)
          }
        })
      }

      if (status === constants.FAILED_STATUS) {
        return state.merge({
          data: {
            ...state.data,
            favoriteOff: !payload.favorite ? 
              _.concat(favoriteOff, [{ id: payload.profile }]) : 
              favoriteOff.filter((u) => u.id !== payload.profile)
          }
        })
      }

      return state
    },

    comment: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          creatingComment: true,
          commentCreated : false,
        }) 
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          creatingComment: false,
          commentCreated : true,
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

    clearDetail: (state) => {
      return state.merge({
        loading: true,
        data: null,
        loadingComments: false,
        comments: [],
        loadingRelated: false,
        relatedWines: [],
        loadingPairings: false,
        pairings: [],
      })
    },
  },


  effects: {
    getDetail: {
      *callback(actions, { payload, }) {
        let response = yield call(api.wines.getDetail, payload.id, payload.extras)
        if (response.ok) {
          yield put(actions.getDetail({
            data: response.data.data
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    getComments: {
      *callback(actions, { payload, }) {
        let response = yield call(api.wines.getComments, payload.id, payload.extra)

        if (response.ok) {
          yield put(actions.getComments({
            data: response.data.data
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    getRelated: {
      *callback(actions, { payload, }) {
        let response = yield call(api.wines.getRelatedWines, payload.wine)

        if (response.ok) {
          yield put(actions.getRelated({
            data: response.data.data.results.filter(w => w.id !== payload.wine.id)
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    getPairings: {
      *callback(actions, { payload, }) {
        let response = yield call(api.wines.getPairings, payload)

        if (response.ok) {
          yield put(actions.getPairings({
            data: response.data.data
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    setFavorite: {
      *callback(actions, { payload, }) {
        let response = yield call(api.wines.setFavorite, payload.wineId, payload.favorite)

        if (response.ok) {
          yield put(actions.setFavorite({
            wine    : response.data.data.wine,
            profile : response.data.data.profile,
            favorite: payload.favorite,
            message : payload.favorite ? I18n.t('wine.added_to_favorites') : I18n.t('wine.removed_from_favorites')
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.setFavorite({}, constants.FAILED_STATUS))
        }
      }
    },

    comment: {
      * callback(actions, { payload, }) {
        let response = yield call(api.wines.comment, payload.id, payload.accountId, payload.comment)

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
        let response = yield call(api.wines.likeComment, payload.id, payload.accountId, payload.like)

        if (response.ok) {
          yield put(actions.likeComment({
            comment: response.data.data,
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.likeComment(payload, constants.SUCCESS_STATUS))
        }
      }
    }
  },
})

export default wineModule
