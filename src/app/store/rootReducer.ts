import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { moviesReducer, MoviesState } from './movies/reducer'

export interface RootState {
  movies: MoviesState
  router: RouterState
}

export const rootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    movies: moviesReducer,
  })
