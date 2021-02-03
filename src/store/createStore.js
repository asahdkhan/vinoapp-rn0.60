import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import ReduxPersist from 'config/ReduxPersist'
import StartupActionCreators from 'modules/startup/actions'
import { notificationsMiddleware, } from 'services/utils/NotificationsMiddleware'

// Store Creation
export default (rootReducer, sagas) => {
  /* ------------- Redux Configuration ------------- */
  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */
  const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : {
  }
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor,
  })
  middleware.push(sagaMiddleware)

  /* ------------ Notifications Middleware ---------- */
  middleware.push(notificationsMiddleware())

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    //enhancers.push(autoRehydrate())
  }

  const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  store.asyncReducers = {
  }
  store.runSaga = sagaMiddleware.run

  // kick off root saga
  sagaMiddleware.run(sagas, store)

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    store.dispatch(StartupActionCreators.startup())
  }

  // const screenWathcer = new ScreenVisibilityListener(store)
  // screenWathcer.register()

  return store
}
