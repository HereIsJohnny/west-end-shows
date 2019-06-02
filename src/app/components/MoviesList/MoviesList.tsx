import { Box } from '@material-ui/core'
import { Movie } from 'app/store/movies/reducer'
import Fuse from 'fuse.js'
import React, { useMemo } from 'react'
import { SEARCH_CONFIG } from '../Search/config'
import { MovieCard } from './MovieCard'

interface MoviesListProps {
  movies: Movie[]
  searchQuery: string | null
}

export const MoviesList: React.FunctionComponent<MoviesListProps> = ({ movies, searchQuery }) => {
  const filteredMovies = useMemo(
    () =>
      searchQuery && searchQuery.length > 3
        ? new Fuse(movies, SEARCH_CONFIG).search(searchQuery)
        : movies,
    [movies, searchQuery]
  )
  return (
    <Box mt={10}>
      {filteredMovies.map(movie => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </Box>
  )
}
