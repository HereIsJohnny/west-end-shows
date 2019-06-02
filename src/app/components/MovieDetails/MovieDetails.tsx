import React from 'react'
import { Movie } from 'app/store/movies/reducer'
import { Link } from 'react-router-dom'

type MovieDetailsProps = Movie

export const MovieDetails: React.FunctionComponent<MovieDetailsProps> = ({
  title,
  description,
  imageSrc,
  location,
}) => (
  <React.Fragment>
    <Link to='/'>Back</Link>
    <img src={imageSrc} />
    <h2>{title}</h2>
    <h3>{location}</h3>
    <p>{description}</p>
  </React.Fragment>
)
