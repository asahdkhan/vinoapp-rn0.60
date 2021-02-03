import { put, call } from 'redux-saga/effects'
import iconLoader from 'services/utils/IconLoader'
import ActionCreators from './actions'

export function* loadIcons({ payload, }) {
  const result = yield call(iconLoader, payload.icons)
  let iconsLoaded = {}
  payload.icons.forEach((icon, idx) => {
    if (icon.customName) {
      iconsLoaded[icon.customName] = result[idx]
    } else {
      iconsLoaded[icon.name] = result[idx]
    }
  })
  yield put(ActionCreators.loadIconsSuccess(iconsLoaded))
}
