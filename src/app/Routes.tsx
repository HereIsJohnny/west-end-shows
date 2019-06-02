import React from 'react'
import { Route, Switch } from 'react-router'
import { MainPage } from './pages/MainPage'
import { MovieDetails } from './pages/MovieDetails'

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path={'/'} component={MainPage} />
    <Route path={'/movie/:id'} component={MovieDetails} />
  </Switch>
)
