import { createModule, constants, } from 'services/utils/redux-acron'
import { call, put, } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import { REHYDRATE } from 'redux-persist/constants'

const locationModule = createModule({
  name: 'i18n',
  state: {
    lang: I18n.locale.substr(0, 2)
  },

  handlers: {
    changeLang: (state, { payload, }) => {
      I18n.locale = payload.lang
      return state.merge({
        lang: payload.lang
      })
    },

    [REHYDRATE]: (state, { payload }) => {
      I18n.locale = payload.i18n ? 'en' : 'en'
      return state.merge({
        ...payload.i18n
      })
    }
  },


  effects: {
  }
})

export default locationModule

//I18n.locale = payload.i18n ? payload.i18n.lang : 'en'

