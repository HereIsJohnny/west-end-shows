import { actionCreatorFactory } from 'typescript-fsa'

const action = actionCreatorFactory('SEARCH')

export const updateSearchQuery = action<{ query: string | null }>('UPDATE_QUERY')
