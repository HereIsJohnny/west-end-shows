import React from 'react'
import { Route, Switch } from 'react-router'
import { MainPage } from './pages/MainPage'
import { MoviePage } from './pages/MoviePage'

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path={'/'} component={MainPage} />
    <Route path={'/movie/:id'} component={MoviePage} />
  </Switch>
)
