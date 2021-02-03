/* eslint no-param-reassign: ["error", { "props": false }] */
import { combineReducers } from 'redux'
import { reducer as formReducer, } from 'redux-form'
import { reducer as startupReducer } from './startup/reducer'
import { reducer as navigationReducer } from './navigation/reducer'
import { reducer as iconsReducer } from './icons/reducer'
import { reducer as messageReducer } from './messages/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    app: startupReducer,
    nav: navigationReducer,
    form: formReducer,
    icons: iconsReducer,
    messages: messageReducer, 
    ...asyncReducers,
  })
}

/**
 * Inject a reducer in the store.
 * @param {Object} store  : Global store of the app.
 * @param {String} key    : Key that will have the reducer injected into the store.
 * @param {Object} reducer: Specefic reducer to inject in the store.
 */
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
