import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getMovies } from './store/movies/actions'

export interface ApplicationRootActions {
  onApplicationStart: () => void
}

const connectComponent = connect(
  () => ({}),
  (dispatch: Dispatch): ApplicationRootActions => ({
    onApplicationStart: () => dispatch(getMovies.started()),
  })
)

export const ApplicationRoot = connectComponent(
  ({ onApplicationStart }: ApplicationRootActions) => {
    useEffect(() => {
      onApplicationStart()
    }, [])

    return <h1>Hello World</h1>
  }
)
