import React from 'react'
import { RouteComponentProps } from 'react-router'

export const MovieDetails = (routeProps: RouteComponentProps<{ id: string }>) => (
  <h1>Movie Details {routeProps.match.params.id}</h1>
)
