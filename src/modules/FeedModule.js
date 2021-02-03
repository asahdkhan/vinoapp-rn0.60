import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import _ from 'lodash'
import api from 'services/api'
import ArticleModule from './ArticleModule'
import AppUsersModule from './AppUsersModule'
import AuthModule from './AuthModule'

const feedModule = createModule({
  name: 'feed',
  state: {
    data: [],
    loading: true,
    page: 1,
    limit: 10,
    total: 0,
    category: null,
    categories: []
  },

  handlers: {
    fetchBlogPost: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        let { data, page, limit, total } = payload
        return state.merge({
          loading: false,
          data: page === 1 ? data : _.concat(state.data, data),
          page,
          limit,
          category: null,
          total
        })
      }

      return state
    },

    fetchCategories: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loading: false,
          categories: payload.data
        })
      }

      return state
    },

    fetchPostByCategory: (state, { payload, status = constants.PENDING_STATUS, }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        let { data, page, limit, total, category } = payload
        return state.merge({
          loading: false,
          data: page === 1 ? data : _.concat(state.data, data),
          page,
          limit,
          category,
          total
        })
      }

      return state
    },

    fetchFeed: (state, { payload, status = constants.PENDING_STATUS, }) => {
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

    fetchPublicFeed: (state, { payload, status = constants.PENDING_STATUS, }) => {
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

    [ArticleModule.actionsTypes.setLike]: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.SUCCESS_STATUS) {
        let feed = state.data.map(post => {
          let article = post.target

          if (article.id === payload.id && post.type === 'Article') {
            let likes = payload.like ?
              _.concat(article.likes, [{ id: payload.accountId }]) :
              article.likes.filter((u) => u.id !== payload.accountId)

            return {
              ...post,
              target: {
                ...article,
                likes
              }
            }
          } else {
            return post
          }
        })

        return state.merge({
          data: feed
        })
      }

      return state
    },

    [AppUsersModule.actionsTypes.setFollower]: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.SUCCESS_STATUS) {
        let feed = state.data.map(post => {
          if (post.type === 'USER' && post.target.id === payload.id) {
            let user = post.target
            let followers = !payload.isFollowing ?
              _.concat(user.followers, [payload.accountId]) :
              user.followers.filter((u) => u !== payload.accountId)
            return {
              ...post,
              target: {
                ...user,
                followers,
              }
            }
          } else {
            return post
          }
        })

        return state.merge({
          data: feed
        })
      }

      return state
    },

    [AuthModule.actionsTypes.logout]: (state) => {
      return state.merge({
        data: null,
        loading: false,
        page: 0,
        limit: 15,
      })
    },
  },


  effects: {
    fetchBlogPost: {
      * callback(actions, { payload }) {
        let response = yield call(api.blog.getAllPost, payload.page, payload.limit)
        if (response.ok) {
          let total = response.headers && response.headers['x-wp-total']
          yield put(actions.fetchBlogPost({
            data: response.data,
            page: payload.page,
            limit: payload.limit,
            total,
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    fetchCategories: {
      * callback(actions) {
        let response = yield call(api.blog.abc)
        if (response.ok) {
          yield put(actions.fetchCategories({
            data: response.data
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    fetchPostByCategory: {
      * callback(actions, { payload }) {
        let response = yield call(api.blog.getPostByCategory, payload.page, payload.limit, payload.category)
        if (response.ok) {
          let total = response.headers && response.headers['x-wp-total']
          yield put(actions.fetchPostByCategory({
            data: response.data,
            page: payload.page,
            limit: payload.limit,
            category: payload.category,
            total,
          }, constants.SUCCESS_STATUS))
        }
      }
    },

    fetchFeed: {
      * callback(actions, { payload }) {
        let response = yield call(api.feed.get, payload.page, payload.limit)
        if (response.ok) {
          yield put(actions.fetchFeed({
            data: response.data.data,
          }, constants.SUCCESS_STATUS))
        }
      },
    },

    fetchPublicFeed: {
      * callback(actions, { payload, }) {
        let response = yield call(api.feed.getPublicFeed, payload.page, payload.limit)
        if (response.ok) {
          yield put(actions.fetchPublicFeed({ data: response.data.data, }, constants.SUCCESS_STATUS))
        }
      }
    }
  },
})

export default feedModule
