import React from 'react'
import { Route, Switch } from 'react-router'
import { MainPage } from './views/MainPage'
import { MovieDetails } from './views/MovieDetails'

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path={'/'} component={MainPage} />
    <Route path={'/movie/:id'} component={MovieDetails} />
  </Switch>
)
