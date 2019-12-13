import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
// import { createBrowserHistory } from "history"
import App from './components/App'
import { ImageRoutes } from './routes'
import PageNotFound from "./components/PageNotFound"
import { List as ImagesList } from "./routes/Images"

// const browserHistory = createBrowserHistory();
const appContent = (
  <App>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ImagesList} />
        <Route path='/images' component={ImageRoutes} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </App>
)
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(appContent, MOUNT_NODE);
