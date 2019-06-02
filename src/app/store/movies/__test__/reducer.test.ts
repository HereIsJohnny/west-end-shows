import { moviesReducer } from '../reducer'

describe('movies reducer', () => {
  it('should handle MOVIES/GET_MOVIES_DONE', () => {
    const action = {
      type: 'MOVIES/GET_MOVIES_DONE',
      payload: {
        result: [
          {
            id: 'id',
            title: 'title',
            description: 'description',
            imageSrc: 'src',
            location: 'location',
          },
          {
            id: 'id2',
            title: 'title2',
            description: 'description2',
            imageSrc: 'src2',
            location: 'location2',
          },
        ],
      },
    }

    expect(moviesReducer({ allIds: [], byId: {} }, action)).toEqual({
      allIds: ['id', 'id2'],
      byId: {
        id: action.payload.result[0],
        id2: action.payload.result[1],
      },
    })
  })
})
