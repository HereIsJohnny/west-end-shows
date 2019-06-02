import { combineEpics } from 'redux-observable'
import { moviesEpics } from './movies/epics'

export const rootEpic = combineEpics(moviesEpics)
