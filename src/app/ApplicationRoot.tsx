import { CssBaseline, makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
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
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.root}>
          <Routes />
        </Container>
      </React.Fragment>
    )
  }
)
