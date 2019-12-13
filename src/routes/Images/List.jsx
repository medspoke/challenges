import React, { PureComponent } from 'react'
import { getParamValue } from 'utils'

export default class List extends PureComponent {
  render() {
    const searchQuery = getParamValue(this.props.location, 'search')

    return (
        <h1>Hello! from Images list page. Search query is: {searchQuery}</h1>
    )
  }
}
