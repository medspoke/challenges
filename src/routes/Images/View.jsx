import React, { PureComponent } from 'react'
import PT from 'prop-types'

export default class View extends PureComponent {
  static propTypes = {
    imageId: PT.string.isRequired,
  }

  render() {
    return (
        <h1>Page for image #{this.props.imageId}</h1>
    )
  }
}
