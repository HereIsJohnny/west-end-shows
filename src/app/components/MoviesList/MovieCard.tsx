import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Movie } from 'app/store/movies/reducer'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  link: {
    marginLeft: 'auto',
    textDecoration: 'none',
  },
  media: {
    height: 140,
  },
  mediaMd: {
    height: '100%',
  },
})

export const MovieCard: React.FunctionComponent<{ movie: Movie }> = ({ movie }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <Box mt={4} mb={4}>
      <Card>
        <Grid container>
          <Grid item xs={12} md={4}>
            <CardMedia
              className={isMd ? classes.mediaMd : classes.media}
              image={movie.imageSrc}
              title={movie.title}
            />
          </Grid>
          <Grid item xs={12} md={8}>
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
              <Link className={classes.link} to={`/movie/${movie.id}`}>
                <Button size='large' color='primary'>
                  Get tickets
                </Button>
              </Link>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
