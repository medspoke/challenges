import React  from "react"
import { Route } from "react-router-dom"
import List from './List'
import View from './View'

export const ImageRoutes = () => (
  <>
    <Route path='/images' exact component={List} />
    <Route
      path='/images/:imageId'
      render={({ match }) => <View imageId={match.params.imageId} />}
    />
  </>
)

export default ImageRoutes
