import { createModule, constants, } from 'services/utils/redux-acron'
import I18n from 'react-native-i18n'
import { call, put, } from 'redux-saga/effects'
import { stopSubmit, } from 'redux-form'
import { REHYDRATE } from 'redux-persist/constants'
import api, { api as ApiInstance } from 'services/api'

const authModule = createModule({
  name: 'auth',

  state: {
    token: null,
    guest: false,

    loading: false,
    errors: null,

    signupLoading: false,
    signupErrors: null,

    forgotLoading: false,
    forgotErrors: null,
  },

  handlers: {
    [REHYDRATE]: (state, { payload }) => {
      if (payload.auth.token) {
        ApiInstance.setHeaders({
          Authorization: `JWT ${payload.auth.token}`,
        })
      }

      return state.merge({
        ...payload.auth,
        loading: false,
        errors: null,
        signupLoading: false,
        signupErrors: null,
      })
    },

    guest: (state, { payload, }) => {
      return state.merge({
        guest: payload.guest,
      })
    },

    signup: (state, { payload, status = 'pending', }) => {
      if (status === 'pending') {
        return state.merge({
          signupLoading: true,
          signupErrors: false,
        })
      }

      if (status === 'success') {
        ApiInstance.setHeaders({
          'Authorization': 'JWT ' + payload.token,
        })
        return state.merge({
          signupLoading: false,
          signupErrors: false,
          token: payload.token,
        })
      }

      if (status === 'failed') {
        return state.merge({
          signupLoading: false,
        })
      }
    },

    forgotPassword: (state, { payload, status = 'pending', }) => {
      if (status === 'pending') {
        return state.merge({
          forgotLoading: true,
          forgotErrors: false,
        })
      }

      if (status === 'success') {
        return state.merge({
          forgotLoading: false,
          forgotErrors: false,
        })
      }

      if (status === 'failed') {
        return state.merge({
          forgotLoading: false,
          forgotErrors: true,
        })
      }
    },

    login: (state, { payload, status = 'pending', }) => {
      if (status === 'pending') {
        return state.merge({
          loading: true,
          errors: false,
        })
      }

      if (status === 'success') {
        ApiInstance.setHeaders({
          'Authorization': 'JWT ' + payload.token,
        })
        return state.merge({
          loading: false,
          errors: false,
          token: payload.token,
        })
      }

      if (status === 'failed') {
        return state.merge({
          loading: false,
          errors: true,
        })
      }

      return state
    },

    socialLogin: (state, { payload, status = constants.PENDING_STATUS }) => {
      if (status === constants.PENDING_STATUS) {
        return state.merge({
          loading: true,
          errors: null,
        })
      }

      if (status === constants.SUCCESS_STATUS) {
        ApiInstance.setHeaders({
          'Authorization': 'JWT ' + payload.token,
        })

        return state.merge({
          loading: false,
          errors: null,
          token: payload.token
        })
      }

      return state
    },

    logout: (state) => {
      ApiInstance.setHeaders({
        'Authorization': '',
      })

      return state.merge({
        token: null,
        guest: false,
      })
    },
  },

  effects: {
    signup: {
      *callback(actions, { payload, }) {
        const response = yield call(api.auth.signup, payload.data)
        if (response.ok) {
          yield put(actions.signup({
            data: response.data.data.user,
            token: response.data.data.token,
          }, 'success'))
        } else {
          let message = I18n.t("login.signup_error")
          if (response.data.data) {
            if (response.data.data.email) {
              message = I18n.t("login.invalid_email")
            }
          }

          yield put(actions.signup({
            message: message,
          }, 'failed'))
          /* yield put(stopSubmit('signup', {
            ...response.data
          })) */
        }
      },
    },

    forgotPassword: {
      *callback(actions, { payload, }) {
        const response = yield call(api.auth.forgotPassword, payload)
        if (response.ok) {
          yield put(actions.forgotPassword({
            message: response.data.message,
          }, 'success'))
        } else {
          let message = response.data.message
          yield put(actions.forgotPassword({
            message: message,
          }, 'failed'))
        }
      },
    },

    login: {
      type: 'latest', //every
      *callback(actions, { payload, }) {
        const response = yield call(api.auth.login, payload.email, payload.password)
        if (response.ok) {
          yield put(actions.login({
            data: response.data.data.user,
            token: response.data.data.token,
          }, 'success'))
        } else {
          yield put(actions.login(true, 'failed'))
          yield put(stopSubmit('login', { message: I18n.t('login.login_error') }))
        }
      }
    },

    socialLogin: {
      *callback(actions, { payload, }) {
        const response = yield call(api.auth.socialSignup, 'facebook', payload)
        if (response.ok) {
          yield put(actions.socialLogin({
            data: response.data.data.user,
            token: response.data.data.token,
          }, constants.SUCCESS_STATUS))
        } else {
          yield put(actions.socialLogin(true, constants.FAILED_STATUS))
        }
      }
    }
  },
})

export default authModule
