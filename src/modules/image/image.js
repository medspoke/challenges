import { merge, findIndex } from 'lodash'

export const IMAGE_KEY = 'image'

const actions = {}
const initialState = {
  search: '',
  imageIds: []
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
export const selectPrevImageId = (state, currentId) => {
  const imageIds = selectState(state).imageIds
  const currentImageIdIndex = findIndex(imageIds, (id) => id === currentId)
  return imageIds[currentImageIdIndex - 1]
}

export const selectNextImageId = (state, currentId) => {
  const imageIds = selectState(state).imageIds
  const currentImageIdIndex = findIndex(imageIds, (id) => id === currentId)
  return imageIds[currentImageIdIndex + 1]
}

// ------------------------------------
// Actions
// ------------------------------------

const SAVE_IMAGE_IDS = `${IMAGE_KEY}/SAVE_IMAGE_IDS`

export function saveImageIds(ids) {
  return {
    type: SAVE_IMAGE_IDS,
    payload: { ids },
  }
}

actions[SAVE_IMAGE_IDS] = (state, { payload }) => merge({}, state, {
  imageIds: payload.ids,
})

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
