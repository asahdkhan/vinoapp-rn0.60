import { all, } from 'redux-saga/effects'

/**
 * Module initializer
 * @param {Array} of Models
 * @param {Object} extra configs
 * @return {Object} actions/reducers/sagas generators
 */
export default (models, config={ activeSaga: true, }) => {
  const actions = {}
  const types   = {}
  const reducers= {}
  let sagas   = []

  let modelsCreated = {}

  models.map(model => {
    let key = model.name
    actions[key] = model.actionCreators
    reducers[key] = createReducer(
      model.initialState, 
      model.actionHandlers
    )

    types[key] = model.actionsTypes
    sagas = sagas.concat(model.sagas)
  })

  // Run all the watchers
  let rootSagas = function* root() {
    yield all(sagas)
  }

  return {
    actions,
    types,
    reducers,
    rootSagas,
    sagas,
  }
}

/**
 * Helper to build a reducer
 * @param {Object} initialState 
 * @param {Map} handlers
 * @return {Func} a redux reducer
 */
export const createReducer = (initialState, handlers) => {
  return (state=initialState, action) => {
    const handler = handlers[action.type]
    return handler ? handler(state, action) : state
  }
}