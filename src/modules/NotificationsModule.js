import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import { REHYDRATE } from 'redux-persist/constants'
import api from 'services/api'

const notificationsModule = createModule({
  name: 'notifications',
  state: {
    currentToken: null,
    perms: null,
    list: [],
  },

  handlers: {
    saveToken: (state, { payload, status = constants.PENDING_STTUS}) => {
      return state
    },

    setToken: (state, { payload, }) => {
      return state.merge({
        currentToken: payload.token,
      })
    },

    setPerms: (state, { payload, }) => {
      return stat.merge({
        perms: payload.accepted,
      })
    },

    displayNotification: (state) => {
      return state
    },

    notificationReceived: (state, { payload }) => {
      let list = state.list

      let notification = {
        id     : list.length + 1,
        readed : false,
        title  : payload.notification.title,
        message: payload.notification.message,
        type   : payload.notification.type,
        targetIcon : payload.notification.icon,
        targetType : payload.notification.targetType,
        targetId   : payload.notification.targetId,
        targetTitle: payload.notification.targetTitle ? payload.notification.targetTitle : '',
        createdAt  : new Date()
      }

      return state.merge({
        list: [...state.list, notification],
      })
    },

    notificationOpened: (state) => {
      return state
    },

    readNotification: (state,  { payload, }) => {
      let list = state.list.map(not => {
        if (not.id === payload.id) {
          return {
            ...not,
            readed: true,
          }
        } else {
          return not
        }
      })

      return state.merge({
        list,
      })
      
    },

    [REHYDRATE]: (state, { payload }) => {
      return state.merge({
        ...payload.notifications
      })
    }
  },


  effects: {
    saveToken: {
      *callback(actions, { payload }) {
        const response = yield call(api.devices.create,
          payload.accountId,
          payload.token,
          payload.lang,
          payload.platform,
        )

        yield put(actions.setToken({ token: payload.token }))
      }
    }
  },
})

export default notificationsModule
