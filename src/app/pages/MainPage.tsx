import { Container } from '@material-ui/core'
import { MoviesList } from 'app/components/MoviesList/MoviesList'
import { Search } from 'app/components/Search/Search'
import { Movie } from 'app/store/movies/reducer'
import { RootState } from 'app/store/rootReducer'
import { updateSearchQuery } from 'app/store/search/actions'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface MainPageStateProps {
  movies: Movie[]
  searchQuery: string | null
}

interface MainPageDispatchProps {
  onSearchChange: (event: string | null) => void
}

const MainPageComponent: React.FunctionComponent<MainPageStateProps & MainPageDispatchProps> = ({
  movies,
  searchQuery,
  onSearchChange,
}) => (
  <div>
    <Search onChange={onSearchChange} query={searchQuery} />
    <Container>
      <MoviesList movies={movies} searchQuery={searchQuery} />
    </Container>
  </div>
)

const mapStateToProps = (state: RootState): MainPageStateProps => ({
  movies: state.movies.allIds.map(title => state.movies.byId[title]),
  searchQuery: state.search.query,
})

const mapDispatchToProps = (dispatch: Dispatch): MainPageDispatchProps => ({
  onSearchChange: query => dispatch(updateSearchQuery({ query })),
})

export const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageComponent)
