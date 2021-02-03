import Immutable from 'seamless-immutable'
import { snakeCase, } from 'lodash'
import { takeLatest, takeEvery } from 'redux-saga/effects'
import { PENDING_STATUS, } from './constants'

/**
 * Acron Module
 */
export class Module {
  constructor() {
    this.modelName = this.constructor.name
    this.initialState = {}
    this.actionsTypes = {}
    this.actionCreators= {}
    this.actionHandlers = {}
    this.sagas = []
    this.rootSagas = false
  }

  name = this.constructor.name

  init() {
    // Initial State
    this.initialState = Immutable(this.state)

    Object.keys(this.handlers).map(actionName => {
      //Action Type
      const actionType = `@${this.modelName}/${snakeCase(actionName).toLocaleUpperCase()}`
      this.actionsTypes[actionName] = actionType

      //Action Creator
      if (actionName.indexOf('@') === -1) {
        if (this.effects && this.effects[actionName]) {
          this.actionCreators[actionName] = (data, status) => ({
            type: actionType,
            payload: data,
            status,
          })
        } else {
          this.actionCreators[actionName] = (data) => ({
            type: actionType,
            payload: data,
          })
        }
      }

      //Acion Handler for reducer
      if (actionName.indexOf('@') === -1) {
        this.actionHandlers[actionType] = this.handlers[actionName]
      } else {
        this.actionHandlers[actionName] = this.handlers[actionName]
      }

      //Effects
      if (this.effects && this.effects[actionName]) {
        let callback = this.effects[actionName].callback
        
        const effect = this.effects[actionName].type === 'all' ? takeEvery : takeLatest

        this.sagas.push(
          effect((action) => {
            return action.type === actionType && (!action.status || action.status === PENDING_STATUS)
          }, callback, this.actionCreators)
        )
      }
    })
  }
}

// /**
//  * Initialize a module an return his instance.
//  * @param {Module} module 
//  */
// export const initialize = (module) => {
//   const mm = new module()
//   mm.init()

//   return mm
// }


/**
 * Alternative to create a module
 */
export const createModule = (config) => {
  // Initial State
  const initialState = Immutable(config.state)
  let actionCreators = {}
  let actionsTypes   = {}
  let actionHandlers = {}
  let sagas = []

  Object.keys(config.handlers).map(actionName => {
    //Action Type
    const actionType = `@${config.name}/${snakeCase(actionName).toLocaleUpperCase()}`
    actionsTypes[actionName] = actionType

    let onlyHandler = (actionName) => {
      let isActionType = actionName.indexOf('@') > -1
      let isValidName  = actionName.indexOf('/') === -1

      return (isActionType || !isValidName)
    }

    //Action Creator
    if (!onlyHandler(actionName)) {
      if (config.effects && config.effects[actionName]) {
        actionCreators[actionName] = (data, status) => ({
          type: actionType,
          payload: data,
          status,
        })
      } else {
        actionCreators[actionName] = (data) => ({
          type: actionType,
          payload: data,
        })
      }
    }

    //Acion Handler for reducer
    if (onlyHandler(actionName)) {
      actionHandlers[actionName] = config.handlers[actionName]
    } else {
      actionHandlers[actionType] = config.handlers[actionName]
    }

    console.log(actionHandlers)

    //Effects
    if (config.effects && config.effects[actionName]) {
      let callback = config.effects[actionName].callback
      
      const effect = config.effects[actionName].type === 'all' ? takeEvery : takeLatest

      sagas.push(
        effect((action) => {
          return action.type === actionType && (!action.status || action.status === PENDING_STATUS)
        }, callback, actionCreators)
      )
    }
  })

  return {
    name: config.name,
    initialState,
    actionCreators,
    actionsTypes,
    actionHandlers,
    sagas,
  }
}
