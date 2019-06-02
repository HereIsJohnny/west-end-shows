import { actionCreatorFactory } from 'typescript-fsa'
import { Movie } from './reducer'

const action = actionCreatorFactory('MOVIES')

export const getMovies = action.async<void, Movie[]>('GET_MOVIES')
