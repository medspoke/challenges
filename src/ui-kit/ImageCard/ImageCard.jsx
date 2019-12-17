import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { Card, Elevation } from "@blueprintjs/core";
import cx from 'classnames'
import classes from './ImageCard.scss'

export default class ImageCard extends PureComponent {
  static propTypes = {
    imageURL: PT.string.isRequired,
    title: PT.string.isRequired,
    subtitle: PT.string,
    classNames: PT.string,
    handleClick: PT.func.isRequired
  }

  static defaultProps = {
    subtitle: null,
    classNames: null,
  }

  render = () => {
    const { imageURL, title, subtitle, classNames, handleClick } = this.props
    const cardClasses = cx(classNames, classes.imageCard)

    return (
      <Card className={cardClasses} interactive elevation={Elevation.TWO} onClick={handleClick}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subtitle}>{subtitle}</div>
        <img key={imageURL} src={imageURL} alt={imageURL} />
      </Card>
    )
  }
}
