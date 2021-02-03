import Config from 'react-native-config'
import { create, } from 'apisauce'
import Api from './Api'

export const api = create({
  baseURL: Config.API_BASE,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 30000,
})

export const blogAPI = create({
  baseURL: Config.BLOG_BASE,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  },
  timeout: 30000,
})

api.addMonitor(console.tron.apisauce)

//export default FixtureApi
export default Api(api, blogAPI)
