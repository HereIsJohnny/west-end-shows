import { MoviesList } from 'app/components/MoviesList/MoviesList'
import { Movie } from 'app/store/movies/reducer'
import { RootState } from 'app/store/rootReducer'
import React from 'react'
import { connect } from 'react-redux'

const MainPageComponent: React.FunctionComponent<{ movies: Movie[] }> = ({ movies }) => (
  <div>
    <MoviesList movies={movies} />
  </div>
)

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.allIds.map(title => state.movies.byId[title]),
})

export const MainPage = connect(
  mapStateToProps,
  null
)(MainPageComponent)
