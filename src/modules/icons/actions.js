
/* ------------- Action Types ----------- */
export const LOADING_ICONS = 'LOADING_ICONS'
export const LOADING_ICONS_SUCCESS = 'LOADING_ICONS_SUCCESS'
export const LOADING_ICONS_FAILURE = 'LOADING_ICONS_FAILURE'

/* ------------- Action Creators ------------- */
export default {
  loadIcons: (icons) => ({
    type: LOADING_ICONS,
    payload: {
      icons,
    },
  }),

  loadIconsSuccess: (icons) => ({
    type: LOADING_ICONS_SUCCESS,
    payload: {
      icons,
    },
  }),
}
