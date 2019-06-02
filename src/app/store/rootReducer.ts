import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { moviesReducer, MoviesState } from './movies/reducer'
import { searchReducer, SearchState } from './search/reducer'

export interface RootState {
  movies: MoviesState
  router: RouterState
  search: SearchState
}

export const rootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    movies: moviesReducer,
    search: searchReducer,
  })
