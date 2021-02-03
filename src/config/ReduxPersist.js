import { AsyncStorage } from 'react-native'
import ImmutablePersistenceTransform from 'services/utils/ImmutablePersistenceTransform'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    storage: AsyncStorage,
    whitelist: ['auth', 'user', 'i18n', 'zones', 'notifications'],
    // blacklist: ['search','form'],
    transforms: [ImmutablePersistenceTransform ],
  },
}

export default REDUX_PERSIST
