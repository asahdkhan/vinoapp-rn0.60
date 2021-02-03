/* ------------- Action Types ----------- */
export const SCREEN_CHANGE = 'SCREEN_CHANGE'

/* ------------- Action Creators ------------- */
export default {
  screenChange: (newScreenId) => ({
    type: SCREEN_CHANGE,
    payload: {
      newScreenId,
    },
  }),
}
