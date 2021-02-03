import { put, select, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import ReduxPersist from 'config/ReduxPersist'
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import Config from 'react-native-config'
import ActionCreators from './actions'

import UserModule from '../UserModule'


const persist = (store, config) => new Promise((resolve, reject) => {
  persistStore(store, config, (data) => {
    resolve(data)
  })
})

// Process STARTUP action
export function* startup(store) {
  yield call(delay, 1200)
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.display({
      name: Config.APP_NAME,
      preview: 'Starting App',
      value: {
        status: 'startup in progress',
      },
    })
  }

  const { reducerVersion } = ReduxPersist
  const config = ReduxPersist.storeConfig

  // Check to ensure latest reducer version
  try {
    const localVersion = yield call(AsyncStorage.getItem, 'reducerVersion')
    if (localVersion !== reducerVersion) {
      console.tron.display({
        name: 'PERSIST PURGE',
        value: {
          'Old Version:': localVersion,
          'New Version:': reducerVersion,
        },
        preview: 'Reducer Version Change Detected',
        important: true,
      })
      // Purge store
      persistStore(store, config).purge()
      // yield call(AsyncStorage.setItem, ['reducerVersion', reducerVersion ])
      AsyncStorage.setItem('reducerVersion', reducerVersion)
      yield put(ActionCreators.startupFinished())
    } else {
      yield call(persist, store, config)
      //yield put(ActionCreators.startupFinished())
    }
  } catch (error) {
    yield call(persist, store, config)
    //yield put(ActionCreators.startupFinished())
    //const test = persistStore(store, config, persistCallback)
    //.tron.logs('PPP', test)
    // yield call(AsyncStorage.setItem, ['reducerVersion', reducerVersion])
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  }
}

export function* finishRehydration() {
  //const { auth } = yield select()
  yield call(getUserInfo)
  yield put(ActionCreators.startupFinished())
}

function* getUserInfo() {
  const { auth } = yield select()

  if (auth.token) {
    yield call(UserModule.effects.getInfo, UserModule.actionCreators)
  } else {
    return
  }
}

