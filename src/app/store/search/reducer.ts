import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { updateSearchQuery } from './actions'

export interface SearchState {
  query: string | null
}

const intialState: SearchState = {
  query: null,
}

export const searchReducer = reducerWithInitialState(intialState).case(
  updateSearchQuery,
  (state, { query }): SearchState => ({
    ...state,
    query,
  })
)
