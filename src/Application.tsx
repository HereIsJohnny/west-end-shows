// import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { hot } from 'react-hot-loader'
// import { Provider } from 'react-redux'
// import { GlobalStyle } from '../common/styles/GlobalStyle'
// import { ApplicationRoot } from './ApplicationRoot'
// import { history } from './store/history'
// import { store } from './store/store'

// const Application: React.FunctionComponent = () => (
//     <GlobalStyle />
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <ApplicationRoot />
//         </ConnectedRouter>
//       </Provider>
// )

const Application: React.FunctionComponent = () => <h1>Hello World</h1>

// tslint:disable-next-line:no-default-export
export default hot(module)(Application)
