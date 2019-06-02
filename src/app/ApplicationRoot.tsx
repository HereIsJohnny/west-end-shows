import { CssBaseline, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Routes } from './Routes'
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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))

export const ApplicationRoot = connectComponent(
  ({ onApplicationStart }: ApplicationRootActions) => {
    useEffect(() => {
      onApplicationStart()
    }, [])

    const classes = useStyles()

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Routes />
      </div>
    )
  }
)
