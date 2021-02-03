import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import { REHYDRATE } from 'redux-persist/constants'
import authModule from './AuthModule'
import wineModule from './WineModule'
import vintageModule from './VintageModule'
import api from 'services/api'
import _ from 'lodash'

const userModule = createModule({
  name: 'user',
  state: {
    tab: null,
    data: null,
    info: null,
    loadingInfo: false,
    updatingInfo: false,
    dirtyForm: false,
    uploadingAvatar: false,
  },

  handlers: {
    [authModule.actionsTypes.signup]: (state, { payload, status }) => {
      if (status === 'success') {
        return state.merge({
          data: payload.data,
        })
      }

      return state
    },

    [authModule.actionsTypes.login]: (state, { payload, status }) => {
      if (status === 'success') {
        return state.merge({
          data: payload.data,
        })
      }

      return state
    },


    [authModule.actionsTypes.socialLogin]: (state, { payload, status }) => {
      if (status === 'success') {
        return state.merge({
          data: payload.data,
        })
      }

      return state
    },

    [authModule.actionsTypes.logout]: (state) => {
      return state.merge({
        data: null,
        info: null,
        loadingInfo: false,
        updatingInfo: false,
        dirtyForm: false,
        uploadingAvatar: false,
      })
    },

    [wineModule.actionsTypes.setFavorite]: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.SUCCESS_STATUS && state.info) {
        let favorites = state.info.favorites
        return state.merge({
          info: {
            ...state.info,
            favorites: payload.favorite ?
              _.concat(favorites, payload.wine) :
              favorites.filter(fav => fav.id !== payload.wine.id)
          }
        })
      }

      return state
    },


    [vintageModule.actionsTypes.setWishlist]: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.SUCCESS_STATUS && state.info) {
        let wishlist = state.info.wishlist
        return state.merge({
          info: {
            ...state.info,
            wishlist: payload.wishlist ?
              _.concat(wishlist, payload.vintage) :
              wishlist.filter(fav => fav.id !== payload.vintage.id)
          }
        })
      }

      return state
    },

    updateTab: (state, { payload }) => {
      return state.merge({
        tab: payload.tab
      })
    },

    getInfo: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loadingInfo: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          loadingInfo: false,
          info: payload.info,
        })
      }

      return state
    },

    updateInfo: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          updatingInfo: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        const userData = Object.assign({}, state.data, payload.data);
        return state.merge({
          updatingInfo: false,
          dirtyForm: false,
          data: userData
        })
      }

      return state
    },

    changeAvatar: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          uploadingAvatar: true,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        return state.merge({
          uploadingAvatar: false,
          data: {
            ...state.data,
            photo: payload.photo,
          }
        })
      }

      if (status === constants.FAILED_STATUS) {
        return state.merge({
          uploadingAvatar: false,
        })
      }

      return state
    },

    sendMessage: (state, { payload, status = constants.PENDING_STATUS }) => {
      return state
    },

    [REHYDRATE]: (state, { payload }) => {
      return state.merge({
        ...payload.user,
        uploadingAvatar: false,
        loadingInfo: false,
        dirtyForm: false,
        uploadingAvatar: false,
      })
    },

    '@@redux-form/CHANGE': (state, { meta }) => {
      if (meta.form === 'profile') {
        return state.merge({
          dirtyForm: true,
        })
      } else {
        return state
      }
    }
  },


  effects: {
    getInfo: {
      *callback(actions) {
        const response = yield call(api.auth.getInfo)

        if (response.ok) {
          yield put(actions.getInfo({
            info: response.data.data,
          }, constants.SUCCESS_STATUS))
        } else {
          //yield put(actions.getInfo(true, constants.FAILED_STATUS))
        }
      }
    },

    updateInfo: {
      *callback(actions, { payload }) {
        const response = yield call(api.auth.updateInfo, payload.info)

        if (response.ok) {
          yield put(actions.updateInfo({
            data: response.data.data,
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.updateInfo(true, constants.FAILED_STATUS))
        }
      }
    },

    changeAvatar: {
      *callback(actions, { payload }) {
        const response = yield call(api.auth.changeAvatar, payload.photo)
        if (response.ok) {
          yield put(actions.changeAvatar({
            photo: `${response.data.data.photo}?d=${new Date().getTime()}`,
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.changeAvatar({}, constants.FAILED_STATUS))
        }
      }
    },

    sendMessage: {
      *callback(actions, { payload, }) {
        const response = yield call(api.auth.sendMessage, payload.message)
      }
    }
  },
})

export default userModule
