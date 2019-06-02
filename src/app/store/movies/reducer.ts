import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { getMovies } from './actions'
import slugify from 'slugify'

export interface MoviesState {
  allTitles: string[]
  byTitle: Record<string, Movie>
}

export interface Movie {
  title: string
  description: string
  imageSrc: string
  location: string
}

const intialState: MoviesState = {
  allTitles: [],
  byTitle: {},
}

const normalizeMovies = (movies: Movie[]): MoviesState =>
  movies.reduce((state, movie) => {
    const movieTitle = slugify(movie.title, { lower: true })
    return {
      allTitles: [...state.allTitles, movieTitle],
      byTitle: {
        ...state.byTitle,
        [movieTitle]: movie,
      },
    }
  }, intialState)

export const moviesReducer = reducerWithInitialState(intialState).case(
  getMovies.done,
  (state, { result }): MoviesState => ({
    ...state,
    ...normalizeMovies(result),
  })
)
