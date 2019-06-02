import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { getMovies } from './actions'

export interface MoviesState {
  allIds: string[]
  byId: Record<string, Movie>
}

export interface Movie {
  id: string
  title: string
  description: string
  imageSrc: string
  location: string
}

const intialState: MoviesState = {
  allIds: [],
  byId: {},
}

export const normalizeMovies = (movies: Movie[]): MoviesState =>
  movies.reduce(
    (state, movie) => ({
      allIds: [...state.allIds, movie.id],
      byId: {
        ...state.byId,
        [movie.id]: movie,
      },
    }),
    intialState
  )

export const moviesReducer = reducerWithInitialState(intialState).case(
  getMovies.done,
  (state, { result }): MoviesState => ({
    ...state,
    ...normalizeMovies(result),
  })
)
