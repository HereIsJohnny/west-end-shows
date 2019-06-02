import React from 'react'
import { Route, Switch } from 'react-router'
import { MovieDetails } from './views/MovieDetails'
import { MoviesList } from './views/MoviesList'

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path={'/'} component={MoviesList} />
    <Route path={'/movie/:id'} component={MovieDetails} />
  </Switch>
)
