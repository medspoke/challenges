import { merge } from 'lodash'

export const IMAGE_KEY = 'image'

const actions = {}
const initialState = {
  search: ''
}

// ------------------------------------
// Reducer
// ------------------------------------

const reducer = (state = initialState, action) => {
  const handler = actions[action.type]

  return handler ? handler(state, action) : state
}

export default reducer

// ------------------------------------
// Selectors
// ------------------------------------

export const selectState = state => state[IMAGE_KEY]
export const selectImageSearch = (state) => selectState(state).search

// ------------------------------------
// Actions
// ------------------------------------

const APPLY_SEARCH = `${IMAGE_KEY}/APPLY_SEARCH`

export function applySearch(searchValue) {
  return {
    type: APPLY_SEARCH,
    payload: { searchValue },
  }
}

actions[APPLY_SEARCH] = (state, { payload }) => merge({}, state, {
  search: payload.searchValue,
})
