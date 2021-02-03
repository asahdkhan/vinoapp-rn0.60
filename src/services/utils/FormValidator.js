/**
 * Check if the email its valid
 * @param {String} value
 * @return {Bool}
 */
export const validEmail = (value) => {
  if (!value) {
    return false
  } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(value)) {
    return false
  }

  return true
}
