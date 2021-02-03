import Immutable from 'seamless-immutable'

// is this object already Immutable?
const isImmutable = (object) => Immutable.isImmutable(object)

// change this Immutable object into a JS object
const convertToJs = (obj) => obj.asMutable({
  deep: true,
})

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = (raw) => {
  if (isImmutable(raw)) {
    return convertToJs(raw)
  }
  return null
}

// convert this JS object into an Immutable object
const toImmutable = (raw) => Immutable(raw)

// the transform interface that redux-persist is expecting
export default {
  out: (state) => toImmutable(state),
  in: (raw) => fromImmutable(raw),
}
