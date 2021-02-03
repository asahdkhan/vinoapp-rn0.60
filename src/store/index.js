import rootSaga from 'modules/sagas'
import modules from 'modules'
import makeRootReducer from 'modules/reducers'
import createStore from './createStore'

export default () => {
  return createStore(makeRootReducer(modules.reducers), rootSaga)
}
