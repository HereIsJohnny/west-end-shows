import { moviesService } from 'app/services/MoviesService'
import { Action } from 'redux'
import { combineEpics } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, exhaustMap, filter, map } from 'rxjs/operators'
import { getMovies } from './actions'

const getMoviesEpic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(getMovies.started.match),
    exhaustMap(action =>
      moviesService.getMovies().pipe(
        map(result => getMovies.done({ result, params: action.payload })),
        catchError(error => of(getMovies.failed({ params: action.payload, error })))
      )
    )
  )

export const moviesEpics = combineEpics(getMoviesEpic)
