import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getMovies } from './store/movies/actions'
import { Routes } from './Routes'

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

    return (
      <div>
        <Routes />
      </div>
    )
  }
)
