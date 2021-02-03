import _ from 'lodash'
import { validEmail, } from 'services/utils/FormValidator'

/**
 * Validations for signup form.
 * @param {Object} fields values of the form.
 * @return {Object} with the errors. Return an empty object if all data is valid.
 */

export const validator = (data) => {
  const { name, lastname, email, location, password, } = data

  const nameErrors = _.without([
    !name ? 'Enter a name' : '',
  ], '')

  const lastnameError = _.without([
    !lastname ? 'Enter a name' : '',
  ], '')

  const passwordError = _.without([
    !password ? 'Enter a password' : '',
  ], '')

  const locationError = _.without([
    !location ? 'Select a country' : '',
  ], '')

  const statesError = _.without([
    !states && location == "United States" ? 'Select a states' : '',
  ], '')

  const emailError = _.without([
    !email ? 'Enter a email address' : '',
    !validEmail(email) ? 'Invalid email address' : '',
  ], '')

  return Object.assign({},
    nameErrors.length > 0 ? { name: nameErrors[0], } : {},
    lastnameError.length > 0 ? { lastname: lastnameError[0], } : {},
    emailError.length > 0 ? { email: emailError[0], } : {},
    locationError.length > 0 ? { location: locationError[0], } : {},
    statesError.length > 0 ? { states: statesError[0], } : {},
    passwordError.length > 0 ? { password: passwordError[0], } : {},
  )
}

export default validator
