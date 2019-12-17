import { createStore } from 'redux'
import makeRootReducer from './rootReducer'

export default function configureStore(routes, initialState) {
  return createStore(makeRootReducer(), initialState)
}
