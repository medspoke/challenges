import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './components/App'
import configureStore from 'store'
import { ImageRoutes } from './routes'
import PageNotFound from "./components/PageNotFound"
import { List as ImagesList } from "./routes/Images"

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
})

const store = configureStore()
const appContent = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route path='/' exact component={ImagesList} />
            <Route path='/images' component={ImageRoutes} />
            <Route component={PageNotFound} />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
)
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(appContent, MOUNT_NODE);
