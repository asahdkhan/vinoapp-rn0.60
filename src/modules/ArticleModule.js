import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import _ from 'lodash'
import api from 'services/api'

const articleModule = createModule({
  name: 'article',
  state: {
    data: null,
    loading: false,
    comments: [],
    commentsLoading: false,
    
    creatingComment: false,
    commentCreated : false,
  },

  handlers: {
    getArticle:  (state, { payload, status = constants.PENDING_STATUS, }) => {
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

    fetchComments: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status ===  constants.PENDING_STATUS) {
        return state.merge({
          commentsLoading: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          commentsLoading: false,
          comments       : payload.data,
        })
      }

      return state
    },

    clearDetail: (state) => {
      return state.merge({
        loading: false,
        data: null,
        comments: [],
        commentsLoading: false,
      })
    },

    setLike: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (!state.data) {
        return state
      }

      let likes = _.clone(state.data.likes)

      if (status === constants.PENDING_STATUS) {
        return state.merge({
          data: {
            ...state.data,
            likes: payload.like ? 
              _.concat(likes, [{ id: payload.accountId }]) : 
              likes.filter((u) => u.id !== payload.accountId)
          }
        })
      }

      if (status === constants.FAILED_STATUS) {
        return state.merge({
          data: {
            ...state.data,
            likes: !payload.like ? 
              _.concat(likes, [{ id: payload.accountId }]) : 
              likes.filter((u) => u.id !== payload.accountId)
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
  },


  effects: {
    getArticle: {
      * callback(actions, { payload }) {
        let response = yield call(api.articles.getDetail, payload.id)
        if (response.ok) {
          yield put(actions.getArticle({ 
            data: response.data.data,
          }, constants.SUCCESS_STATUS))
        }
      },
    },

    fetchComments: {
      * callback(actions, { payload, }) {
        let response = yield call(api.articles.getComments, payload.id)
        if (response.ok) {
          yield put(actions.fetchComments({ data: response.data.data,}, constants.SUCCESS_STATUS))
        }
      }
    },

    setLike: {
      * callback(actions, { payload, }) {
        let response = yield call(api.articles.setLike, payload.id, payload.accountId, payload.like)
        
        if (response.ok) {
          yield put(actions.setLike(payload, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.setLike(payload, constants.SUCCESS_STATUS))
        }
      }
    },

    comment: {
      * callback(actions, { payload, }) {
        let response = yield call(api.articles.comment, payload.id, payload.accountId, payload.comment)

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
        let response = yield call(api.articles.likeComment, payload.id, payload.accountId, payload.like)

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

export default articleModule
