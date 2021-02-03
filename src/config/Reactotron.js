import Config from 'react-native-config'
import Reactotron, { trackGlobalErrors as errorPlugin } from 'reactotron-react-native'
import tronsauce from 'reactotron-apisauce'
import Immutable from 'seamless-immutable'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

if (__DEV__) {
  Reactotron
    .configure({
      host: 'localhost', // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: Config.APP_NAME,
    })

    //host: '192.168.0.143'

    // forward all errors to Reactotron
    .use(errorPlugin({
      // ignore all error frames from react-native (for example)
      veto: (frame) =>
        frame.fileName.indexOf('/node_modules/react-native/') >= 0,
    }))

    // Redux registration
    .use(reactotronRedux({
      // We only set important if the action is an error or a failure
      // Can be customized
      isActionImportant: (action) => action.type.indexOf('_FAILURE') > -1 || action.type.indexOf('_ERROR') > -1,

      // Remove rehydrate action from login in reactotron
      except: [],

      onRestore: (state) => Immutable(state),
    }))

    // Redux-Saga registration
    .use(sagaPlugin())

    // Api Sauce
    .use(tronsauce())

    .connect()


  Reactotron.clear()

  console.tron = Reactotron
  console.tron.logs = (title, value) => {
    console.tron.display({
      name: title,
      preview: typeof value,
      value,
      important: true,
    })
  }
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    logs: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false,
  }
}
