import { takeLatest, all } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/constants'

import * as StartupActionTypes from './startup/actions'
import * as StartupSagas from './startup/sagas'

import * as IconsActionTypes from './icons/actions'
import * as IconSagas from './icons/sagas'

import modules from 'modules'

const root = function* root(store) {
  yield all([
    takeLatest(StartupActionTypes.STARTUP, StartupSagas.startup, store),
    takeLatest(IconsActionTypes.LOADING_ICONS, IconSagas.loadIcons),
    takeLatest(REHYDRATE, StartupSagas.finishRehydration),
    ...modules.sagas
  ])
}

/**
 * Inject a saga.
 * @param {Object} store: Global store of the app.
 * @param {Array}  sagas: List of saga functions to inject.
 */
export function injectSagas(store, sagas) {
  // TODO: Add check to validate that sagas is valid (is an array of generators)
  sagas.map(store.runSaga, store)
}

export default root
