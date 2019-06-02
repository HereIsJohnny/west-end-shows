import { Container } from '@material-ui/core'
import { MovieDetails } from 'app/components/MovieDetails/MovieDetails'
import { MoviesState } from 'app/store/movies/reducer'
import { RootState } from 'app/store/rootReducer'
import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

interface MovieDetailsStateProps {
  movies: MoviesState
}

type MovieDetailsProps = MovieDetailsStateProps & RouteComponentProps<{ id: string }>

const MainPageComponent: React.FunctionComponent<MovieDetailsProps> = ({ movies, match }) => {
  const movie = useMemo(() => movies.byId[match.params.id], [match])
  return (
    <Container>
      <MovieDetails {...movie} />
    </Container>
  )
}

const mapStateToProps = (state: RootState): MovieDetailsStateProps => ({
  movies: state.movies,
})

export const MoviePage = connect(
  mapStateToProps,
  null
)(MainPageComponent)
