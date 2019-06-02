import { httpClient } from 'app/dataAccess/HttpClient'
import { Movie } from 'app/store/movies/reducer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import slugify from 'slugify'

export interface MovieDto {
  title: string
  venue: string
  description: string
  image: string
}

class MoviesServiceClass {
  public getMovies = (): Observable<Movie[]> =>
    httpClient.getJSON<MovieDto[]>('/movies.json').pipe(map(dtos => dtos.map(this.mapDtoToMovies)))

  private mapDtoToMovies = (dto: MovieDto): Movie => ({
    id: slugify(dto.title, { lower: true }),
    title: dto.title,
    description: dto.description,
    imageSrc: dto.image,
    location: dto.venue,
  })
}

export const moviesService = new MoviesServiceClass()
