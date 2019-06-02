import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { history } from './history'
import { rootEpic } from './rootEpic'
import { rootReducer } from './rootReducer'

const epicMiddleware = createEpicMiddleware()

const configureStore = (preloadedState?: any) => {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(routerMiddleware(history), epicMiddleware))
  )
}

export const store = configureStore()

epicMiddleware.run(rootEpic)
