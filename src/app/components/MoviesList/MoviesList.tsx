import { Movie } from 'app/store/movies/reducer'
import React from 'react'

export const MoviesList: React.FunctionComponent<{ movies: Movie[] }> = ({ movies }) => (
  <div>
    {movies.map(movie => (
      <MovieCard key={movie.title} movie={movie} />
    ))}
  </div>
)

const MovieCard: React.FunctionComponent<{ movie: Movie }> = ({ movie }) => (
  <div>
    <img src={movie.imageSrc} />
    <h2>{movie.title}</h2>
    <h3>{movie.location}</h3>
    <p>{movie.description}</p>
  </div>
)
