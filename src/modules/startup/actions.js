/* ------------- Action Types ----------- */
export const STARTUP = 'STARTUP'
export const STARTUP_FINISHED = 'STARTUP_FINISHED'

/* ------------- Action Creators ------------- */
export default {
  startup: () => ({
    type: STARTUP,
  }),

  startupFinished: (token) => ({
    type: STARTUP_FINISHED,
    payload: {
      token,
    }
  }),
}
