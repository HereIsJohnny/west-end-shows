import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Movie } from 'app/store/movies/reducer'
import React from 'react'

export const MoviesList: React.FunctionComponent<{ movies: Movie[] }> = ({ movies }) => (
  <React.Fragment>
    {movies.map(movie => (
      <MovieCard key={movie.title} movie={movie} />
    ))}
  </React.Fragment>
)

const useStyles = makeStyles({
  button: {
    marginLeft: 'auto',
  },
  media: {
    height: 140,
  },
})

const MovieCard: React.FunctionComponent<{ movie: Movie }> = ({ movie }) => {
  const classes = useStyles()

  return (
    <Box mt={4} mb={4}>
      <Card>
        <CardMedia className={classes.media} image={movie.imageSrc} title={movie.title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {movie.title}
          </Typography>
          <Typography gutterBottom variant='h5' component='h3'>
            {movie.location}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {movie.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size='large' color='primary'>
            Get tickets
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
